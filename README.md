# DrawIt- New generation of mapping d3 graphs
A graph library based on d3 for simple manipulation with customization.

##How to use it
```html
//example.html
<script type="text/javascript" src="js/d3/d3.min.js"></script>
<!-- Insert drawit.js here-->
<script type="text/javascript" src="js/drawit.min.js"></script>
```
```js
//example.js
var stackedGraph = new DI({ //Initiate a graph
        selector:"svg", //Selector for element,
        type:DI.GraphNames.stacked, //Type of the graph, DI.GraphNames contains list of the graph enum
        dim:{   //Define/override dimention of the graph
          height:200,
          width:200
        },
        data:[ //Data source for graph to draw
          {
            name: "Hoodie",
            values: [
              { count: 6, date: "2014-01-01" },
              { count: 7, date: "2014-01-02" },
              { count: 8, date: "2014-01-03" }
            ]
          },
          {
            name: "Lost",
            values: [
              { count: 8, date: "2014-01-01" },
              { count: 3, date: "2014-01-02" },
              { count: 5, date: "2014-01-03" }
            ]
          },
          {
            name: "Jacket",
            values: [
              { count: 2, date: "2014-01-01" },
              { count: 5, date: "2014-01-02" },
              { count: 7, date: "2014-01-03" }
            ]
          },
          {
            name: "Snuggie",
            values: [
              { count: 3, date: "2014-01-01" },
              { count: 2, date: "2014-01-02" },
              { count: 3, date: "2014-01-03" }
            ]
          }
        ]
      })
      stackedGraph.draw(); //Draw the graph, Alternate stackedGraph.draw(/*{data here}*/)
      var listener = stackedGraph.on('layers', 'click', function () { //This will return listener object
                   //Bind event on stackedGraph['layers'] element, params {selector(available in that graph), event, callback}
        console.log("Hi haaa...!!", arguments);
        console.log(listener);
        listener.unbind(); //Unbind listener on stackedGraph['layers'] element
        stackedGraph.unbind(0);//Alternate way to Unbind listener on stackedGraph['layers'] element, using listener id
      })
```
##How to use development tools
```bash
#Install all dev dependency
$npm install

#Clean build folder
$npm run clean

#Review  code using jshint
$npm run jshint

#Build distribution js
$npm run build

#Build distribution js with d3 lib
$npm run d3build
```
##API document
> [Wiki](API Reference) ▸ **API Reference** 


* [Create a DrawIt graph object](#graph-object) 
* [Choose Graph type](#graph-type)
* [Define Selector](#graph-node-selection)
* [Override Graph Dimensions](#graph-dimensions) 
* [Override Data](#graph-data) 
* [Bind Node Listener](#graph-node-listener) 
* [Unbind Node Listener](#graph-unbind-listener) 

##[Graph Object](#wiki)
DI constructor will return graph object based on graph type
```js
var stackedGraph = new DI({ //Initiate a graph
  type:DI.GraphNames.stacked, //mandatory type for element,
});
//DI constructor will return graph object based on graph type
//User can see list of the graph available in DI.GraphNames enum
```

##[Graph Type](#wiki)
User has to choose a type while creating new DI object. User can see list of the graph available in DI.GraphNames enum.
```js
var config = { 
 type:DI.GraphNames.stacked, //mandatory type for element,
};
```
```js
var stackedGraph = new DI(config);
```

##[Graph Node Selection](#wiki)
Similarly as graph type, User has to choose a selector on which d3 will create/draw graph. Selector will be relative to Document body.
```js
var config = { 
 selector:"svg.stacked" //mandatory selector for element
};
```
```js
var stackedGraph = new DI(config);
```

##[Graph Dimensions](#wiki) 
Similarly as graph selector, User can choose dimansion of the graph.By default width and height of graph chosen from *_DrawIt.default_* or *_DI.default_* which are 600x600. 
```js
var config = { 
  dim:{   //Define/override dimension of the graph
    height:200,
    width:200
  }
};
```
```js
var stackedGraph = new DI(config);
```
```js
//Override DI defaults
DrawIt.defaults = {
        height: 600,
        width: 600
    };
```

##[Graph Data](#wiki) 
User can pass data to graph object in two way. 

1. Using DI constructor
2. Using instance variable
```js
//example.js
//Using DI constructor
var stackedGraph = new DI({ //Initiate a graph
  //...
  data:[ //Data source for graph to draw
    {
      name: "Hoodie",
      values: [
        { count: 6, date: "2014-01-01" },
        { count: 7, date: "2014-01-02" },
        { count: 8, date: "2014-01-03" }
      ]
    }
    //...more data here
  ]
})
``` 
```js
//example.js
//Using instance variable
var stackedGraph = new DI({ //Initiate a graph
  //...
  //config here
  //...
})
stackedGraph.data = [ //Data source for graph to draw
  {
    name: "Hoodie",
    values: [
      { count: 6, date: "2014-01-01" },
      { count: 7, date: "2014-01-02" },
      { count: 8, date: "2014-01-03" }
    ]
  }
  //...more data here
];
```

##[Graph Node Listener](#wiki) 
Binding an event to an element is never been so easy. Just grab the element attached to the graph and using *_on_* method you can bind a callback to any DOM element. Just like Jquery.
```js
var listener = stackedGraph.on('layers', 'click', function () { //This will return listener object
    //Bind event on stackedGraph['layers'] element, params {selector(available in that graph), event, callback}
    console.log("Hie ha...!!", arguments);
    console.log(listener);
    stackedGraph.unbind(0);//Alternate way to Unbind listener on stackedGraph['layers'] element, using listener id
  })
```
>Note: *_.on_*(binding) will throw an error if _'layers'_ will not attacked to the stackedGraph instance.

##[Graph Unbind Listener](#wiki) 
Similarly unbinding is very easy. When user bind and event using *_.on_* method. It returns a listener object which contains all the details of the that event listener. Developer can unbind an event either using that listener object or developer can use unbind method of graph instance.
```js
//Using listener instance
var listener = stackedGraph.on('layers', 'click', function () { //This will return listener object
    console.log("Do something here on click");
});
/*
snapshot of listener
{
    id:0,
    event:"click",
    prop:"layers",
    callback:[function],
    unbind:[function]
}
 */
setTimeout(function unbindAfter10Sec() {
  listener.unbind();
}, 10 * 1000)
```
```js
//Using unbind method
var listener = stackedGraph.on('layers', 'click', function () { //This will return listener object
    console.log("Do something here on click");
});
setTimeout(function unbindAfter10Sec() {
  stackedGraph.unbind(listener.id);
}, 10 * 1000)
```
