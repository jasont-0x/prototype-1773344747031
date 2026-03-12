const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/over-18', function (req, res) {
  res.render('over-18')
})

router.post('/over-18', function (req, res) {
  const answer = req.session.data['over-18']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'over-18': 'Select yes if you are 18 or over' }
    return res.render('over-18')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-over-18')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-over-18', function (req, res) {
  res.render('ineligible-over-18')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name' }
    return res.render('full-name')
  }
  res.redirect('/email-address')
})

router.get('/email-address', function (req, res) {
  res.render('email-address')
})

router.post('/email-address', function (req, res) {
  const answer = req.session.data['email-address']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'email-address': 'Enter your email address' }
    return res.render('email-address')
  }
  res.redirect('/security-clearance')
})

router.get('/security-clearance', function (req, res) {
  res.render('security-clearance')
})

router.post('/security-clearance', function (req, res) {
  const answer = req.session.data['security-clearance']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'security-clearance': 'Select yes if you have current security clearance' }
    return res.render('security-clearance')
  }
  res.redirect('/reason-for-meeting')
})

router.get('/reason-for-meeting', function (req, res) {
  res.render('reason-for-meeting')
})

router.post('/reason-for-meeting', function (req, res) {
  const answer = req.session.data['reason-for-meeting']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'reason-for-meeting': 'Enter why you want to meet aliens' }
    return res.render('reason-for-meeting')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('ALN')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
