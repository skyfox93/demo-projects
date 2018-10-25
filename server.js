/*const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/mongoBasics';
mongoose.connect(mongoDB);*/

require('dotenv').load();
const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const hdate=require('human-date')
const fs=require('fs');
var nodemailer=require('nodemailer');
let topics=JSON.parse(fs.readFileSync('./content.json'));
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*
var topic= require('./Models/mongoose.js')
topic.find(function (err, athletes) {
  if (err) {return handleError(err);}
	else{console.log(athletes);topics=athletes;}})/*

	
	// instead of simply loading each topic, and all its comments,
	// we need to access the database for each topic.
	// and save each topic to the database. BUT first, branch.
	
	
  // 'athletes' contains the list of athletes that match the criteria.

/*topicModel.create(topics[0], function (err, instance) {
  if (err) return console.log(err);console.log(instance)
  // saved!
});

*/


/*
// Load Google Credentials
 var credentials=process.env.installed
try{var token=require('./token.json')} catch(error){ console.log('no user credentials stored. That is okay!');}
const { parse } = require('querystring');
var pageNum=0;
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = 'token.json';
var emails=0;
var labelslist=[];
let parsedlist=[];
const simpleParser = require('mailparser').simpleParser;



//set up nodemailer for outgoing messages
try{let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'skylar.salerno@gmail.com',
        clientId:credentials.installed.client_id,
        clientSecret:credentials.installed.client_secret,
        refreshToken:token.refresh_token,
        accessToken: token.access_token,
        expires:token.expiry_date
    }
});} catch(er){}

// Load client secrets from a local file.

  authorize(JSON.parse(credentials), listMessages);

*/
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
/*
function authorize(credentials, callback,query) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client,query);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
/*
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


function listMessages(auth,query) {
  const gmail = google.gmail({version: 'v1', auth});
if(query){console.log('QUERY'+query);
gmail.users.messages.list({
    userId: 'me', q:query
  },messagelister);}

else{
gmail.users.messages.list({
    userId: 'me'},messagelister);}

function messagelister (err, res){parsedlist=[];
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.messages;
    if (labels) {
      labels.forEach((label) => {
gmail.users.messages.get({userId: 'me', id:label.id, format:"raw"},(er, result) => {if(err){console.log('ohnoes');} else{let buffed = new Buffer(result.data.raw,'base64'); simpleParser(buffed.toString(), (err,parsed) => {if (parsed){parsedlist.unshift(parsed)}});}})})}}


};*/


/////////////////// SERVER LOGIC /////////////////////////////////////////////////////////////////////////

app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('doctorwho'));
app.use(express.static('./imageEditor'));
app.get('/',(req,res)=>{res.render('projects');});

/*
var pageNum=0;
app.get('/mailapp', (req,res)=>{pageNum=0;res.redirect('/mailapp/home')})
app.get('/mailapp/next?', (req,res) => {pageNum+=1;res.redirect('/mailapp/home')});
app.get('maillapp/back?', (req,res) => {pageNum-=1;res.redirect('/mailapp/home')});
app.get(/^\/mailapp\/email/,(req,res) =>{var emailNum=parseInt(req.url.slice(15)); console.log('URL IS' + req.url);
res.send(String(parsedlist[emailNum].html)+'</div></body></html>');})
app.get('/mailapp/home',(req,res) => {parsedlist.sort(function(a,b){return b.date- a.date});
res.locals.pageNum=parseInt(pageNum,10);res.locals.parsedlist=parsedlist;res.render('emails');});
app.get('/mailapp/query',(req,res) => {var search=req.query.query; authorize(JSON.parse(credentials), listMessages, search);pageNum=0;setTimeout(function(){res.redirect('/mailapp/home')},3000);});
*/

app.get('/forum', (req, res) => {console.log('incoming');if(req.cookies.user){console.log(req.cookies);res.render('social',{topics:topics, user:req.cookies.user})} else{res.render('welcomesocial')}});

app.post('/forum', (req, res) =>{let date=new Date().toUTCString();let topic={heading:req.body.heading,user:req.cookies.user, comments:[], date};mongoose.update();setTimeout(savetoDisk,2000);
res.redirect('/forum');});

app.post('/forum/user',(req, res)=>{console.log(req.body.user);res.cookie('user',req.body.user,{maxAge:9000000000});res.redirect('/forum');});

app.post('/forum/comment',(req, res)=>{let date=new Date().toUTCString();
topics[parseInt(req.body.topicNum)].comments.push({comment:req.body.comment,user:req.cookies.user, date});setTimeout(savetoDisk,5000);res.redirect('/forum');});

function savetoDisk(){ if(JSON.parse(JSON.stringify(topics,null,4))) {fs.writeFile('./content.json', JSON.stringify(topics,null,4), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})}}


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
