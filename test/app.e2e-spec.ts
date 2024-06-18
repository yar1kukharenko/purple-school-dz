import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateRoomDto } from '../src/room/dto/create-room.dto';
import { ROOM_NOT_FOUND } from '../src/room/room.constants';
import { CreateScheduleDto } from '../src/schedule/dto/create-schedule.dto';
import { SCHEDULE_ALREADY_EXISTS, SCHEDULE_NOT_FOUND } from '../src/schedule/schedule.constants';
import { UpdateRoomDto } from '../src/room/dto/update-room.dto';
import { UpdateScheduleDto } from '../src/schedule/dto/update-schedule.dto';

const roomId = new Types.ObjectId().toHexString();
const scheduleId = new Types.ObjectId().toHexString();

const testRoomDto: CreateRoomDto = {
	description: 'Test Description',
	floor: 2,
	approach: 10,
	photos: ['photo1.png', 'photo2.png'],
	_id: roomId,
};

const testScheduleDto: CreateScheduleDto = {
	roomId: roomId,
	date: new Date().toLocaleDateString(),
	_id: scheduleId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createRoomId: string;
	let createScheduleId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/room/create (POST) - success', () => {
		request(app.getHttpServer())
			.post('/room/create')
			.send(testRoomDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createRoomId = body._id;
				expect(createRoomId).toBeDefined();
				return;
			});
	});

	it('/schedule/create (POST) - success', () => {
		request(app.getHttpServer())
			.post('/schedule/create')
			.send(testScheduleDto)
			.expect(201)
			.then(({ body }) => {
				createScheduleId = body._id;
				expect(createScheduleId).toBeDefined();
				return;
			});
	});

	it('/schedule/create (POST) - fail (schedule already exists)', async () => {
		return request(app.getHttpServer())
			.post('/schedule/create')
			.send(testScheduleDto)
			.expect(HttpStatus.BAD_REQUEST)
			.then(({ body }: request.Response) => expect(body.message).toBe(SCHEDULE_ALREADY_EXISTS));
	});

	it('/schedule/create (POST) - fail (room not found)', async () => {
		const updatedTestScheduleDto: CreateScheduleDto = {
			roomId: new Types.ObjectId().toHexString(),
			date: new Date().toLocaleDateString(),
			_id: scheduleId,
		};
		return request(app.getHttpServer())
			.post('/schedule/create')
			.send(updatedTestScheduleDto)
			.expect(HttpStatus.NOT_FOUND)
			.then(({ body }: request.Response) => expect(body.message).toBe(ROOM_NOT_FOUND));
	});

	it('/room/:id (GET) - success', async () =>
		request(app.getHttpServer())
			.get('/room/' + roomId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(roomId);
				return;
			}));

	it('/schedule/:id (GET) - success', async () =>
		request(app.getHttpServer())
			.get('/schedule/' + scheduleId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(scheduleId);
				return;
			}));

	it('/room/:id (GET) - fail', async () => {
		request(app.getHttpServer())
			.get('/room/' + new Types.ObjectId().toHexString())
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(ROOM_NOT_FOUND));
	});

	it('/schedule/:id (GET) - fail', async () =>
		request(app.getHttpServer())
			.get('/schedule/' + new Types.ObjectId().toHexString())
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(SCHEDULE_NOT_FOUND)));

	it('/room/:id (PATCH) - success', async () => {
		const updatedDto: UpdateRoomDto = {
			description: 'Updated Description',
			floor: 3,
			approach: 15,
			photos: ['photo3.png', 'photo4.png'],
		};

		await request(app.getHttpServer())
			.patch('/room/' + createRoomId)
			.send(updatedDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(createRoomId);
				expect(body.description).toBe(updatedDto.description);
				expect(body.floor).toBe(updatedDto.floor);
				expect(body.approach).toBe(updatedDto.approach);
				expect(body.photos.length).toBe(2);
				return;
			});
	});

	it('/schedule/:id (PATCH) - success', async () => {
		const updatedDto: UpdateScheduleDto = {
			date: new Date().toLocaleDateString(),
		};

		await request(app.getHttpServer())
			.patch('/schedule/' + createScheduleId)
			.send(updatedDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(createScheduleId);
				expect(body.roomId).toBe(roomId);
				expect(new Date(body.date).toLocaleDateString()).toBe(updatedDto.date);
				return;
			});
	});

	it('/room/:id (PATCH) - fail', async () => {
		const updatedDto: UpdateRoomDto = {
			description: 'Updated Description',
			floor: 3,
			approach: 15,
			photos: ['photo3.png', 'photo4.png'],
		};

		await request(app.getHttpServer())
			.patch('/room/' + new Types.ObjectId().toHexString())
			.send(updatedDto)
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(ROOM_NOT_FOUND));
	});

	it('/schedule/:id (PATCH) - fail', async () => {
		const updatedDto: UpdateScheduleDto = {
			date: new Date().toLocaleDateString(),
		};

		await request(app.getHttpServer())
			.patch('/schedule/' + new Types.ObjectId().toHexString())
			.send(updatedDto)
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(SCHEDULE_NOT_FOUND));
	});

	it('/schedule/getByRoom/:roomId - success', async () => {
		const response = await request(app.getHttpServer())
			.get('/schedule/getByRoom/' + roomId)
			.expect(200);

		const body = response.body;
		expect(body).toBeInstanceOf(Array);
		expect(body.length).toBeGreaterThanOrEqual(1);
		return;
	});

	it('/room/:id (DELETE) - success', async () => {
		const dateBeforeDeletion = new Date();

		await request(app.getHttpServer())
			.delete('/room/' + createRoomId)
			.expect(200);

		const findResponse = await request(app.getHttpServer())
			.get('/room/' + createRoomId)
			.expect(200);

		expect(findResponse.body.deletedAt).toBeDefined();
		const deletedAt = new Date(findResponse.body.deletedAt);

		return expect(deletedAt.getTime()).toBeGreaterThan(dateBeforeDeletion.getTime());
	});

	it('/schedule/:id (DELETE) - success', async () => {
		const dateBeforeDeletion = new Date();

		await request(app.getHttpServer())
			.delete('/schedule/' + createScheduleId)
			.expect(200);

		const findResponse = await request(app.getHttpServer())
			.get('/schedule/' + createScheduleId)
			.expect(200);

		expect(findResponse.body.deletedAt).toBeDefined();
		const deletedAt = new Date(findResponse.body.deletedAt);

		return expect(deletedAt.getTime()).toBeGreaterThan(dateBeforeDeletion.getTime());
	});

	it('/room/:id (DELETE) - fail', async () => {
		await request(app.getHttpServer())
			.delete('/room/' + new Types.ObjectId().toHexString())
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(ROOM_NOT_FOUND));
	});

	it('/room/hardDelete/:id (DELETE) - success', async () => {
		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + createRoomId)
			.expect(200);

		await request(app.getHttpServer())
			.get('/room/' + createRoomId)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(ROOM_NOT_FOUND);
				return;
			});
	});

	it('/schedule/hardDelete/:id (DELETE) - success', async () => {
		await request(app.getHttpServer())
			.delete('/schedule/hardDelete/' + createScheduleId)
			.expect(200);

		await request(app.getHttpServer())
			.get('/schedule/' + createScheduleId)
			.expect(404)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe(SCHEDULE_NOT_FOUND);
				return;
			});
	});

	it('/schedule/hardDelete/:id (DELETE) - fail', async () => {
		await request(app.getHttpServer())
			.delete('/schedule/hardDelete/' + new Types.ObjectId().toHexString())
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(SCHEDULE_NOT_FOUND));
	});

	it('/schedule/deleteByRoom/:roomId (DELETE) - success', async () => {
		const scheduleId1 = new Types.ObjectId().toHexString();
		const roomId1 = new Types.ObjectId().toHexString();
		const testRoomDto1: CreateRoomDto = {
			description: 'Test Description 1',
			floor: 1,
			approach: 5,
			photos: ['photo1_1.png', 'photo1_2.png'],
			_id: roomId1,
		};

		await request(app.getHttpServer()).post('/room/create').send(testRoomDto1).expect(201);

		const testDto1: CreateScheduleDto = {
			roomId: roomId1,
			date: new Date().toString(),
			_id: scheduleId1,
		};

		await request(app.getHttpServer()).post('/schedule/create').send(testDto1).expect(201);
		const response = await request(app.getHttpServer())
			.delete('/schedule/deleteByRoom/' + roomId)
			.expect(200);

		const body = response.body;

		expect(body).toBeInstanceOf(Object);
		expect(body.length).toBe(undefined);

		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + roomId1)
			.expect(200);
		return;
	});

	it('/room/hardDelete/:id (DELETE) - fail', async () => {
		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + new Types.ObjectId().toHexString())
			.expect(404)
			.then(({ body }: request.Response) => expect(body.message).toBe(ROOM_NOT_FOUND));
	});

	it('/room/getAll (GET) - success', async () => {
		const roomId1 = new Types.ObjectId().toHexString();
		const roomId2 = new Types.ObjectId().toHexString();
		const page = 1;
		const limit = 10;

		const testDto1: CreateRoomDto = {
			description: 'Test Description 1',
			floor: 1,
			approach: 5,
			photos: ['photo1_1.png', 'photo1_2.png'],
			_id: roomId1,
		};

		const testDto2: CreateRoomDto = {
			description: 'Test Description 2',
			floor: 2,
			approach: 10,
			photos: ['photo2_1.png', 'photo2_2.png'],
			_id: roomId2,
		};
		const response1 = await request(app.getHttpServer())
			.post('/room/create')
			.send(testDto1)
			.expect(201);
		const response2 = await request(app.getHttpServer())
			.post('/room/create')
			.send(testDto2)
			.expect(201);
		const createId1 = response1.body._id;
		expect(createId1).toBeDefined();
		const createId2 = response2.body._id;
		expect(createId2).toBeDefined();

		const getAllResponse = await request(app.getHttpServer())
			.get('/room/getAll')
			.query({ page, limit })
			.expect(200);

		const body = getAllResponse.body;
		expect(body).toBeInstanceOf(Array);
		expect(body.length).toBeGreaterThanOrEqual(2);

		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + createId1)
			.expect(200);

		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + createId2)
			.expect(200);

		return;
	});

	it('/schedule/getAll (GET) - success', async () => {
		const scheduleId1 = new Types.ObjectId().toHexString();
		const scheduleId2 = new Types.ObjectId().toHexString();
		const roomId1 = new Types.ObjectId().toHexString();
		const roomId2 = new Types.ObjectId().toHexString();
		const page = 1;
		const limit = 10;
		const testRoomDto1: CreateRoomDto = {
			description: 'Test Description 1',
			floor: 1,
			approach: 5,
			photos: ['photo1_1.png', 'photo1_2.png'],
			_id: roomId1,
		};

		const testRoomDto2: CreateRoomDto = {
			description: 'Test Description 2',
			floor: 2,
			approach: 10,
			photos: ['photo2_1.png', 'photo2_2.png'],
			_id: roomId2,
		};
		await request(app.getHttpServer()).post('/room/create').send(testRoomDto1).expect(201);
		await request(app.getHttpServer()).post('/room/create').send(testRoomDto2).expect(201);

		const testDto1: CreateScheduleDto = {
			roomId: roomId1,
			date: new Date().toString(),
			_id: scheduleId1,
		};
		const testDto2: CreateScheduleDto = {
			roomId: roomId2,
			date: new Date().toString(),
			_id: scheduleId2,
		};

		const response1 = await request(app.getHttpServer())
			.post('/schedule/create')
			.send(testDto1)
			.expect(201);
		const response2 = await request(app.getHttpServer())
			.post('/schedule/create')
			.send(testDto2)
			.expect(201);
		const createId1 = response1.body._id;
		expect(createId1).toBeDefined();
		const createId2 = response2.body._id;
		expect(createId2).toBeDefined();

		const getAllResponse = await request(app.getHttpServer())
			.get('/schedule/getAll')
			.query({ page, limit })
			.expect(200);

		const body = getAllResponse.body;
		expect(body).toBeInstanceOf(Array);
		expect(body.length).toBeGreaterThanOrEqual(2);

		await request(app.getHttpServer())
			.delete('/schedule/hardDelete/' + createId1)
			.expect(200);

		await request(app.getHttpServer())
			.delete('/schedule/hardDelete/' + createId2)
			.expect(200);
		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + roomId1)
			.expect(200);

		await request(app.getHttpServer())
			.delete('/room/hardDelete/' + roomId2)
			.expect(200);

		return;
	});

	afterAll(() => {
		disconnect();
	});
});
