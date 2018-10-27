# Library Of Custom Functionalites

## Table of Contents

* [About](#About)
* [Usage](#Usage)
* [Contributing](#contributing)
* [License](#License)


## About

This repo contains a library that provides custom functionalities. Most part of the applications are my answers to the udacity's Examine A Framework's Source Course. the name of each functionality is quite descriptive of what it does.

## Usage 

The application provides a 'library' Interface which provides the custom functionalities. It's currently has two methods, i. templatingEngine ii. eventTracker.

* templatingEngine: 

 To use this functionality you have to call library's templating engine with two parameters if the starting and ending delimeters are the same string or three parameters if the starting and ending delimeters are dissimilar. The first parameter is the string you want to use as a template, string must contain starting and ending delimeters for variable content(s) or the string will be returned, the string must also not contain any starting and ending delimeters in it's static body, due to how to engine works. The templating engine returns a function which you can call with data and an optional number that indicate how many times it should be logged to the console.
 Example: library.templatingEngine('my name is |name|, I am |height|meters tall', '|')('paul', 152, 2); 

 ```js
 library.templatingEngine(`<td><a href="#detail/<%= menuItem.id %>"><%= menuItem.name %></a></td>
    <td><%= menuItem.rating %></td>
    <td><%= menuItem.calories %></td>
    <td>
      <button class="select-item">Select Item</button>
    </td>`,'<%=', '%>')({id: 1, name: 'paul', rating: 2, calories: 5}, 5);
    ```

* eventTracker
 this is a constructor function that return an object with on, notify and trigger methods. 
  * the on method
     It is used to add a custom events to the eventTracker instance
     it takes a name parameter and a function or array of functions.
  * the notify method
     It takes two parameters, an eventTracker instance and an event you want the object to be notified of.
  * the trigger method
     It does what it sounds like!.. triggering an event. It takes two parameters, i. name of custom event ii. data for the custom event.


## Contributing

Most of my codes are sloppy and maybe require a little more organisation. If you feel there are improvements to make. Please fork this repo, create and new branch, make the required changes and submit a pull request.


## License

[MIT](https://opensource.or/licenses/mit-license.php).
