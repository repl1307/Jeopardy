class Router {
  constructor(main){
    this.routes = [];
    this.currentRoute = null;
    setInterval(() => {
      console.log(`Current Route: ${this.currentRoute}`);
    }, 1000);
    this.main = main;
  }
  
  createRoute(path, createElemsFunc){
    const oldRoute = this.routes.find(route => route.path == path);
    if(oldRoute)
      this.routes.splice(this.routes.indexOf(oldRoute));
    this.routes.push(new Route(path, createElemsFunc, this));
    this.routes.at(-1).main = this.main;
  }
  async setRoute(path, vars=[]){
    const route = this.routes.find(route => route.path == path);
    
    if(route)
      await route.activate(vars);
    else
      console.error("Route not found: "+path);
  }
}

class Route {
  constructor(path, createElemFunc, router){
    this.path = path;
    this.createElems = createElemFunc;
    this.elems = [];
    this.router = router;
    this.vars = [];
    this.getVars();
  }
  
  //get url variables
  getVars(){
    let p = this.path.split('/');
    for(let i = 0; i < p.length; i++){
      if(p[i].startsWith(':')){
        this.vars.push(p[i]);
      }
    }
  }
  
  //activate route
  activate = async (vars) => {
    let p = this.path.split('/');
    let newP = "";
    let varIndex = 0;
    for(let i = 0; i < p.length; i++){
      if(p[i] == this.vars[varIndex]){
        this.vars.push(p[i]);
        newP += vars[varIndex];
        varIndex++;
      } else {
        newP += p[i];
      }
      if(i < p.length-1)
        newP += "/";
    }

    const currentURL = window.location.href;
    const baseURL = currentURL.split("/").slice(0, 3).join("/");
    //history.pushState(null, null, baseURL+newP)
    this.router.currentRoute = this.path;
    console.log(this.path);
    for(let i = 0; i < this.main.children.length; i++){
      const child = this.main.children[i];
      if(!child.preserveOnRerender){
        this.main.removeChild(i);
        i--;
      }
    }
    
    const elems = await this.createElems();
    
    for(const elem of elems)
      this.main.appendChild(elem);

  }
}

export { Router, Route };