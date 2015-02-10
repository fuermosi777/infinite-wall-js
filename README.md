#Infinite Wall

Infinite Wall is a jQuery plugin that helps you create an infinite photo gallary wall

#Preview

![](http://liuhao.im/projects/image/10.gif =500x)

#How to use

1. Include necssary Javascript and CSS files

```
	<script src="dist/jquery-1.11.2.min.js"></script>
	<link rel="stylesheet" href="css/infinite-wall.css">
	<script src="js/infinite-wall.js"></script>
```
2. Create a `<div>` with an `id`

```
	<div id="viewport">
    </div>

    <script>
    $('#viewport').wall({
        data: data, // replace with your data
        width: 100,
        height: 100
    });
    </script>
```

#Reference
	
Data is a must for display. I have prepared a dummy dataset `data.js`. You can include it in HTML and see. You can also use Ajax to fetch data and use it.

#License

Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).