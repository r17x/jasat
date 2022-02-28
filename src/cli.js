const meow = require("meow");
const chalk = require("chalk");
const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const fs = require("fs/promises");
const crypto = require("crypto");
const { transmute, traverse } = require("equivalent-exchange");
const TARGET_PATTERN = "**/*.{js,jsx,mjs,cjs,ts,tsx}";
const IGNORE_PATTERN = [`**/node_modules/${TARGET_PATTERN}`];

const run = () => {
	const meowOptions = {
		flags: {
			list: { type: "boolean", alias: "l" },
			help: { type: "boolean", alias: "h" },
			version: { type: "boolean", alias: "v" },
			cwd: { type: "string", alias: "C" },
			write: { type: "boolean", alias: "w" },
		},
	};

	const { flags, showHelp, showVersion, input } = meow(
		`
  USAGE
    npx jasat <TRANSFORM> <...OPTIONS>
  
  OPTIONS
    --write, -w         Allow to modified target file.
    --cwd, -C           Set current working directory (default: \`process.cwd()\`).
    --help, -h          Print help.
    --list, -l          Print list of TRANSFORM.
    --version, -v       Print version.`,
		meowOptions
	);

	const noOp = () => {};
	const hash = (fileBuffer) =>
		crypto.createHash("sha256").update(fileBuffer).digest("hex");
	const isModifiedContent = (a, b) => hash(a) !== hash(b);
	const pathToBasename = (p) => path.parse(p).name;
	const getTransforms = async () =>
		await glob(path.join(__dirname, "transforms", "*.js"));

	const showList = () =>
		getTransforms()
			.then((files) =>
				process.stdout.write(
					["", ...files, ""].map((files) => pathToBasename(files)).join("\n")
				)
			)
			.catch(() => process.stdout.write("fail show list"));

	const applyTransform = (code, transform, ...params) =>
		transmute(code, (ast) => traverse(ast, require(transform)(...params))).code;

	const runTransform = async () => {
		const [transformName, ...params] = input;
		const transform = await getTransforms().then((xs) =>
			xs.find(
				(transformFile) => pathToBasename(transformFile) === transformName
			)
		);

		return {
			[true]: noOp,
			[Boolean(transform)]: async () => {
				const cwd = flags.cwd || process.cwd();
				const targetFiles = await glob(TARGET_PATTERN, {
					cwd: path.resolve(cwd),
					realpath: true,
					cache: true,
					ignore: IGNORE_PATTERN,
				}).then((sources) =>
					sources.map(async (source) => {
						const content = await fs.readFile(source, "utf8");
						const newContent = applyTransform(content, transform, ...params);
						const modified = isModifiedContent(content, newContent) ? 1 : 0;
						return {
							location: source,
							content,
							newContent,
							transform: pathToBasename(transform),
							modified,
						};
					})
				);
				return Promise.all(targetFiles)
					.then((files) => {
						if (flags.write) {
							files.forEach((file) =>
								file.modified
									? fs.writeFile(file.location, file.newContent, "utf8")
									: noOp()
							);
						}
						return files;
					})
					.then((files) => {
						const allFiles = files.length;
						const modified = files.reduce((a, f) => f.modified + a, 0);
						process.stdout.write(`
${chalk.blue("All files:")} ${chalk.bold.blue(allFiles)}
${chalk.yellow(flags.write ? "Modified:" : "Found:")} ${chalk.bold.yellow(
							modified
						)}`);
					});
			},
		}.true();
	};

	const runner = {
		[true]: () => runTransform(),
		[flags.version]: () => showVersion(),
		[flags.help]: () => showHelp(),
		[flags.list]: () => showList(),
	}.true;

	runner();
};

module.exports = { run };
