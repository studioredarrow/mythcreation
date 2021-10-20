require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const path = require('path')
const port = 3000
const concurrently = require('concurrently');

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(methodOverride())
app.use(errorHandler())

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  })
}

const handleLinkResolver = doc => {
  if (doc.type === 'detail') {
    return `/detail/${doc.uid}`
  }

  if (doc.type === 'post') {
    return `/post/${doc.uid}`
  }

  if (doc.type === 'myths') {
    return '/myths'
  }

  if (doc.type === 'about') {
    return '/about'
  }

  if (doc.type === 'journal') {
    return '/journal'
  }

  console.log(doc)
  return '/'
}

app.use((req, res, next) => {
  // res.locals.ctx = {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   linkResolver: handleLinkResolver
  // }
  res.locals.Link = handleLinkResolver

  res.locals.PrismicDOM = PrismicDOM

  res.locals.Numbers = index => {
    return index == 0 ? '01' : index == 1 ? '02' : index == 2 ? '03' : index == 3 ? '04' : index == 4 ? '05' : '' ;
  }

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  const meta = await api.getSingle('meta')
  const navigation = await api.getSingle('navigation')
  const preloader = await api.getSingle('preloader')

  return {
    meta,
    navigation,
    preloader
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const home = await api.getSingle('home')

  // const {results: myths} = await api.query(Prismic.Predicates.at('document.type', 'myths'), {
  //   fetchLinks: 'detail.image'
  // })
  //console.log(home)
  res.render('pages/home', {
    ...defaults,
    home,
  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const about = await api.getSingle('about')
  const defaults = await handleRequest(api)

  res.render('pages/about', {
    ...defaults,
    about
  })
})

app.get('/myths', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const home = await api.getSingle('home')

  const {results: myths} = await api.query(Prismic.Predicates.at('document.type', 'myths'), {
    fetchLinks: 'detail.image'
  })
//  console.log(home)
  // myths.forEach(myths => {
  //   console.log(myths.data.details[0].details_myth)
  // })

  res.render('pages/myths', {
    ...defaults,
    home,
    myths
  })
})

app.get('/journal', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const home = await api.getSingle('home')

  const {results: journal } = await api.query(Prismic.Predicates.at('document.type', 'post'), {
    fetchLinks: 'post.getByUID',
    // Order by last publication date from most recent to oldest
    orderings : '[document.last_publication_date desc]',
    pageSize : 50
  })

  res.render('pages/journal', {
    ...defaults,
    home,
    journal
  })
})

// app.get('/detail/:uid', (req, res) => {
//   console.log(req.params.uid)
//
//   initApi(req).then(api => {
//     api.query(Prismic.Predicates.any('document.type', ['meta'])).then(response => {
//       const {results} = response
//       const [meta] = results
//
//       res.render('pages/detail', {
//         meta
//       })
//     })
//   })
// })
app.get('/detail/:uid', async (req, res) => {
  //console.log(req.params.uid)
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  const detail = await api.getByUID('detail', req.params.uid, {
    fetchLinks: 'myths.title'
  })

//  console.log(detail)
  res.render('pages/detail', {
    ...defaults,
    detail
  })
})

app.get('/post/:uid', async (req, res) => {
//  console.log(req.params.uid)
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  const post = await api.getByUID('post', req.params.uid, {
    fetchLinks: 'post.title'
  })

//  console.log(post.data.body)

  // post.data.gallery.forEach(media => {
  //   console.log(media)
  // })
  res.render('pages/post', {
    ...defaults,
    post

  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
