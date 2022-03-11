/**
 * @see {https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html}
 */
const t = require("@babel/types");

const migrateReactDomImplementation = (path) => {
	const container = path.node.arguments[1];
	const root = "root";
	path.insertBefore(
		t.variableDeclaration("const", [
			t.variableDeclarator(
				t.identifier(root),
				t.callExpression(t.identifier("createRoot"), [container])
			),
		])
	);

	path.node.callee.object.name = root;

	path.node.arguments = [path.node.arguments[0]];
};

const migrateImportDeclaration = (path) => {
	path.node.source.value = "react-dom/client";

	path.node.specifiers = [
		t.importSpecifier(t.identifier("createRoot"), t.identifier("createRoot")),
	];
};

const lazyEvalUnit = (maps) =>
	({
		[true]: () => {},
		...maps,
	}.true());

module.exports = function () {
	return {
		CallExpression(path) {
			lazyEvalUnit({
				[path.node.callee.type === "MemberExpression"]: () =>
					lazyEvalUnit({
						[path.node.callee.object.name === "ReactDOM" &&
						path.node.callee.property.name === "render"]: () =>
							migrateReactDomImplementation(path),
					}),
			});
		},
		ImportDeclaration(path) {
			lazyEvalUnit({
				[path.node.source.value === "react-dom"]: () =>
					migrateImportDeclaration(path),
			});
		},
	};
};
