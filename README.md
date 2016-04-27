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


```