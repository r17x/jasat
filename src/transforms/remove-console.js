module.exports = function(){
  return {
    CallExpression(path){
      if (path.node.callee.object.name === "console"){
        path.remove()
      }
    }
  }
}
