import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose from 'mongoose';
import { AppModule } from './../src/app.module';
import { UserSeeder } from '../src/user/user.seeder.service';
import { UserModule } from '../src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userSeeder = { seedUsers: () => {} };

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test');
    await mongoose.connection.db?.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost', { dbName: 'test' }),
        AppModule,
        UserModule,
      ],
    })
      .overrideProvider(UserSeeder)
      .useValue(userSeeder)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer()).get('/user').expect(200).expect([]);
  });

  it('/user (POST)', () => {
    const user = { name: 'abc', email: 'ab@test.com', phone: '+61411111111' };
    return request(app.getHttpServer())
      .post('/user')
      .send(user)
      .expect(200)
      .expect(({ body }) => {
        expect(body.user.name).toEqual(user.name);
        expect(body.user.email).toEqual(user.email);
        expect(body.user.phone).toEqual(user.phone);
        expect(body.message).toContain(
          'User record has been created successfully!',
        );
      });
  });
});
