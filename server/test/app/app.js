import test from 'ava';
import {setupApp} from '../../setup-app';
import supertest from 'supertest';

const app = setupApp();
const request = supertest.agent(app.listen());

test('/', async t => {
  const res = await request.get('/');
  t.is(res.status, 200);
});

test('/stories', async t => {
  const res = await request.get('/stories');
  t.is(res.status, 200);
});

test('/books', async t => {
  const res = await request.get('/books');
  t.is(res.status, 200);
});

test('/wp/articles/:slug', async t => {
  const res = await request.get('/articles/a-drop-in-the-ocean-daniel-regan');
  t.is(res.status, 200);
});

test('/wp/series/:id', async t => {
  const res = await request.get('/series/a-drop-in-the-ocean');
  t.is(res.status, 200);
});

test('/articles/:slug', async t => {
  const res = await request.get('/articles/WaAiJycAAF2MuN0M');
  t.is(res.status, 200);
});

test('/series/:id', async t => {
  const res = await request.get('/series/WcpOjygAAJsLEXTc');
  t.is(res.status, 200);
});

test('301', async t => {
  const res = await request.get('/exhibitions/medicine-man');
  t.is(res.status, 301);
});

test('404', async t => {
  const res = await request.get('/exhibitions/medicine-ma');
  t.is(res.status, 404);
});
