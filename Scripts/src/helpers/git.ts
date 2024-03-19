import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';


function open(url: string) {
  const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');

  spawn(start, [url], { shell: true, stdio: "ignore", detached: true });
}

const GITHUB_CLIENT_ID = '98948cdfdaefb5e9f43a';
const GITHUB_CLIENT_SECRET = '35058eb3d571e855c235f57aa38e4be835034fa9';

const DATA_DIR = path.resolve(__dirname, '..', '..', '..', '.keys');
const DATA_FILE = path.resolve(DATA_DIR, 'name.txt');

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:6691/auth/github/callback'
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user: any, done) {
    done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
    done(null, obj);
});

const app = express();

app.use(require('express-session')({
    secret: '0xYami want CottontailVA to step on her and dominate her',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.

        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR);
        }

        fs.writeFileSync(DATA_FILE, (req.user as any).username);
        res.redirect('/');
    });

app.get('/', function (req: Request, res: Response) {
    if (req.isAuthenticated()) {
    res.send(`Please relaunch the CLI`);
    process.exit(0);
    } else {
    res.redirect('/auth/github')
    }

});

export async function createServer() {
  app.listen(6691, "127.0.0.1", function () {
    console.log('Server started on http://127.0.0.1:6691');
  });
}

export async function getUserName() {
    if (fs.existsSync(DATA_FILE)) {
        return fs.readFileSync(DATA_FILE, 'utf8');
    } else {
        return null;
    }
}

export async function openBrowser() {
    open('http://127.0.0.1:6691/auth/github');
}
