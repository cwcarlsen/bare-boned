const express = require('express')
const sass = require('node-sass-middleware')
const postcss = require('postcss-middleware')
const autoprefixer = require('autoprefixer')
const path = require('path')
const app = express()

app.use(sass({
	src: __dirname + '/public/scss',
	dest: __dirname + '/public/css',
  outputStyle: 'compressed',
  prefix: '/css'
}))

app.use('/css', postcss({
  src: function(req) {
    return path.join(__dirname, 'public', 'css', req.path);
  },
  plugins: [autoprefixer()]
}))

app.use(express.static('public', { extensions: ['html'] } ))

var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on http://localhost:' + listener.address().port)
})
