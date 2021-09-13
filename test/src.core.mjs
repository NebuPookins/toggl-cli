/* eslint no-unused-expressions: 0 */

import chai from 'chai';
import chaiSpies from 'chai-spies';
import core from '../src/core.js';

chai.use(chaiSpies);

const should = chai.should();

describe('simple/core.js', () => {
	describe('CONSTANTS', () => {
		it('should export MIN_IN_SEC', () => {
			should.exist(core.MIN_IN_SEC);
			core.MIN_IN_SEC.should.be.a('number');
			core.MIN_IN_SEC.should.equal(60);
		});

		it('should export HOUR_IN_SEC', () => {
			should.exist(core.HOUR_IN_SEC);
			core.HOUR_IN_SEC.should.be.a('number');
			core.HOUR_IN_SEC.should.equal(60 * 60);
		});

		it('should export DAY_IN_SEC', () => {
			should.exist(core.DAY_IN_SEC);
			core.DAY_IN_SEC.should.be.a('number');
			core.DAY_IN_SEC.should.equal(60 * 60 * 24);
		});
	});

	describe('#getDuration()', () => {
		it('should return 0s string for zero duration', () => {
			const zeroDur = core.getDuration({duration: 0});
			should.exist(zeroDur);
			zeroDur.should.be.a('string');
			zeroDur.should.equal('0s');
		});

		it('should skip empty outer values', () => {
			let dur = core.getDuration({duration: 42});
			should.exist(dur);
			dur.should.equal('42s');

			dur = core.getDuration({duration: 5 * 60});
			should.exist(dur);
			dur.should.equal('5m');

			dur = core.getDuration({duration: 2 * 60 * 60});
			should.exist(dur);
			dur.should.equal('2h');

			dur = core.getDuration({duration: 15 * 60 * 60 * 24});
			should.exist(dur);
			dur.should.equal('15d');
		});

		it('should skip empty middle values', () => {
			let duration = 15 + (1 * 60 * 60);
			let dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('1h 15s');

			duration = (30 * 60) + (2 * 60 * 60 * 24);
			dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('2d 30m');

			duration = 45 + (3 * 60 * 60 * 24);
			dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('3d 45s');
		});

		it('should return neighbour combinations', () => {
			let duration = 5 + (4 * 60);
			let dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('4m 5s');

			duration = (5 * 60) + (4 * 60 * 60);
			dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('4h 5m');

			duration = (5 * 60 * 60) + (3 * 60 * 60 * 24);
			dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('3d 5h');
		});

		it('should truncate the least significant fields', () => {
			let duration = 1 + (2 * 60) + (3 * 60 * 60);
			let dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('3h 2m');

			duration = 59 + (23 * 60 * 60) + (1 * 60 * 60 * 24);
			dur = core.getDuration({duration});
			should.exist(dur);
			dur.should.equal('1d 23h');
		});
	});
});
