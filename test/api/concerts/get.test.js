const Concert = require('../../../models/concert.model');
const server = require('../../../server.js');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testDepOne = new Concert({ _id: '5d9f1140f10a71216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testDepOne.save();
  
    const testDepTwo = new Concert({ _id: '5d9f1159781ce8d1ef2bee48', performer: 'RebekahParker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
    await testDepTwo.save();

    const testDepThree = new Concert({ _id: '5d9f1159f41ce8d1ef2bee49', performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/hdfh42sd213.jpg' });
    await testDepThree.save();

    const testDepFour = new Concert({ _id: '5d9f1259f81ce8d1ef2bee50', performer: 'Ozzy Osbourne', genre: 'Disco Polo', price: 50, day: 2, image: '/img/uploads/hdfh42sd213.jpg' });
    await testDepFour.save();
  });

  it('/should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(4);
  });

  it('/performer/:performer return concerts filtered by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/RebekahParker');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/genre/:genre return concerts filtered by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/concerts/price/:price_min/:price_max return concerts filtered by price', async () => {
    const res = await request(server).get('/api/concerts/price/30/45');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/day/:day return concerts filtered by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(3);
  });

  after(async () => {
    await Concert.deleteMany();
  });

});