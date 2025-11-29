# Fundamentals of Web apps
This module goes through some basics of web development and some good practices that we as enginers should following when developing web apps. 
## Understanding
1. Understand how browser communicates with the server with HTTP requests [Here](#http-communication)
2. DOM (Document Object Model) [Here](#dom)
3. Asynchronous Data Fetching & “AJAX”[Here](#asynchronous-data-fetching--ajax)
4. Forms, HTTP POST & Traditional Form Submissions
5. Single-Page Application (SPA)

### HTTP communication
- Basically the internet uses HTTP to communicate and for a browser to get a webpage, it sends HTTP GET requests to servers with the webpage. In traditional web development, the servers often return HTML files, which could be rendered directly by the browser.  
- While the browser parses the HTML file, there could also be links like images or scripts that need to be fetched, which will trigger the browser to send other HTTP requests to fetch the corresponding content. 
- HTTP requests have a lot of metadata. For example, Content-Type header will tell the browser how to interpret the fetched information.

### DOM
- Web pages are structured as a tree of HTML elements. This is represented in the browser via the DOM (Document Object Model).
- You can use the DOM API to dynamically create and modify elements on the page. 

### Asynchronous Data Fetching & “AJAX”
Before AJAX (pre 2005) every interaction causes a full page reload.  
You can think of why this is bad. 
1. unnecessary re-downloading of CSS, JS, images
2. inefficient

- AJAX simply means JS making background HTTP requests without reloading the page.
    - This is donw by using javascript to send AJAX requests (GET url) to fetch data, which returns JSON (Content-Type remember ?)
- It made things act more like an app rather than documents. 
- Powered applications like gmail, google map, and facebook news feed
- We used XMLHttpRequests to get data from the server

### Forms, HTTP POST & Traditional Form Submissions
- Form was the first way for users to kind of interact with the server, which was introduced in HTML 2.
- This is the “classic” way of handling form-based user input, before modern client-side SPAs (Single Page Applications).

### Single-Page Application (SPA)
- The example walks through a version of the app that behaves more like a SPA: instead of using standard form submission + page reload, it uses JS to handle the form submit event, stops default behavior (e.preventDefault()), builds the note object, updates UI, and sends data via XMLHttpRequest POST with JSON. 

- In that SPA-style version, only a single HTTP POST request is made; there’s no full page reload and no unnecessary fetching of CSS/JS again — which is more efficient.

- Recognize the difference between server-rendered HTML (traditional) vs client-side rendering / dynamic DOM manipulation (JS + AJAX).