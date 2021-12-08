require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const path = require('path')
const cors = require('cors')
const port = 3000
const concurrently = require('concurrently')

app.use(cors())
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
})
*/

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(methodOverride())
app.use(errorHandler())

app.use(express.static(path.join(__dirname, 'public')))

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const UAParser = require('ua-parser-js')

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

  return '/'
}

app.use((req, res, next) => {
  // res.locals.ctx = {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   linkResolver: handleLinkResolver
  // }
  const ua = UAParser(req.headers['user-agent'])
  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type ==='tablet'

//  console.log(  res.locals.isDesktop, res.locals.isPhone, res.locals.isTablet )

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
  const about = await api.getSingle('about')
  const home = await api.getSingle('home')
  const meta = await api.getSingle('meta')
  const navigation = await api.getSingle('navigation')
  const preloader = await api.getSingle('preloader')

  const {results: myths} = await api.query(Prismic.Predicates.at('document.type', 'myths'), {
    fetchLinks: 'detail.image'
  })
  const {results: detail} = await api.query(Prismic.Predicates.at('document.type', 'detail'), {
    fetchLinks: 'detail.image'
  })

  const assets = []

  home.data.gallery.forEach(item => {
    assets.push(item.image.url)
  })

//  console.log(detail)

  about.data.body.forEach(section => {
    if (section.slice_type === 'gallery') {
      section.items.forEach(item => {
        assets.push(item.image.url)
      })
    }
    if (section.slice_type === 'what_is_myth_creation') {
      assets.push(section.primary.image.url)
    }
    if (section.slice_type === 'content') {
      assets.push(section.primary.image.url)
    }
  })

  myths.forEach(myths => {
    myths.data.details.forEach(item => {
      assets.push(item.details_myth.data.image.url)
    })
  })

  detail.forEach(detail => {
    detail.data.body.forEach(section => {
      if (section.slice_type === 'gallery') {
        section.items.forEach(item => {
          assets.push(item.image_detail.url)
        })
      }
    })
  })


  return {
    about,
    assets,
    home,
    detail,
    meta,
    myths,
    navigation,
    preloader
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  // const {results: myths} = await api.query(Prismic.Predicates.at('document.type', 'myths'), {
  //   fetchLinks: 'detail.image'
  // })
  //console.log(home)
  res.render('pages/home', {
    ...defaults

  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)

  const defaults = await handleRequest(api)

  res.render('pages/about', {
    ...defaults

  })
})

app.get('/myths', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)


  // myths.forEach(myths => {
  //   console.log(myths.data.details[0].details_myth)
  // })

  res.render('pages/myths', {
    ...defaults
//    myths
  })
})

app.get('/journal', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  const {results: journal } = await api.query(Prismic.Predicates.at('document.type', 'post'), {
    fetchLinks: 'post.getByUID',
    // Order by last publication date from most recent to oldest
    orderings : '[document.last_publication_date desc]',
    pageSize : 50
  })

  res.render('pages/journal', {
    ...defaults,
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
  console.log(req.params.uid)
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const about = await api.getSingle('about')

  const detail = await api.getByUID('detail', req.params.uid, {
    fetchLinks: 'myths.title'
  })
  // //
  // api.query( Prismic.Predicates.any('document.type', ['meta', 'detail'])).then(response => {
  //   const { results } = response
  //   const [meta, detail] = results
  //   console.log(meta, detail)
  //   console.log(detail.data.body)
  //   detail.data.gallery.forEach(media => {
  //     console.log(media)
  //   })
  //
  // })
  //
  //
  // //console.log(detail.data)


  res.render('pages/detail', {
    ...defaults,
    about,
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
