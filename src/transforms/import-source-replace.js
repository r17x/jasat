module.exports = function(a, b) {
  return {
    ImportDeclaration(path){
      if (path.node.source.value === a){
        path.node.source.value = b
      }
    }
  }
}
