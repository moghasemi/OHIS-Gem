import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canTransitionWorkflow,
  calculateBMI,
  calculatePTA,
  hasPermission,
} from './rules.ts';

test('Workflow: prevents locking if pending referrals exist', () => {
  const result = canTransitionWorkflow('DOCTOR_REVIEW', 'COMPLETED_LOCKED', {
    doctorOpinion: 'balamaneh',
    hasUnresolvedReferrals: true,
  });
  assert.equal(result.allowed, false);
  assert.match(result.reason || '', /منوط به دریافت نتیجه ارجاع/);
});

test('Workflow: prevents locking without doctor opinion', () => {
  const result = canTransitionWorkflow('DOCTOR_REVIEW', 'COMPLETED_LOCKED', {
    hasUnresolvedReferrals: false,
  });
  assert.equal(result.allowed, false);
  assert.match(result.reason || '', /ثبت نظر نهایی پزشک/);
});

test('Workflow: allows locking when opinion is set and referrals resolved', () => {
  const result = canTransitionWorkflow('DOCTOR_REVIEW', 'COMPLETED_LOCKED', {
    doctorOpinion: 'mashroot',
    hasUnresolvedReferrals: false,
  });
  assert.equal(result.allowed, true);
});

test('BMI calculation calculates correct category and rounded score', () => {
  // Height 180cm, Weight 75kg -> 75 / (1.8*1.8) = 23.15 -> 23.1 (normal)
  const res1 = calculateBMI(75, 180);
  assert.equal(res1.bmi, 23.1);
  assert.equal(res1.category, 'طبیعی');

  // Height 170cm, Weight 95kg -> 95 / 2.89 = 32.87 -> 32.9 (obese)
  const res2 = calculateBMI(95, 170);
  assert.equal(res2.bmi, 32.9);
  assert.equal(res2.category, 'چاقی');
});

test('PTA calculation computes pure tone average across occupational frequencies', () => {
  const thresholds = {
    500: 20,
    1000: 15,
    2000: 10,
    3000: 25,
    4000: 30,
  };
  const pta = calculatePTA(thresholds);
  // (20 + 15 + 10 + 25 + 30) / 5 = 100 / 5 = 20
  assert.equal(pta, 20);
});

test('RBAC permission checker enforces strict role access boundaries', () => {
  assert.equal(hasPermission('reception', 'reception'), true);
  assert.equal(hasPermission('reception', 'lab'), false);
  assert.equal(hasPermission('doctor', 'doctor'), true);
  assert.equal(hasPermission('doctor', 'superadmin'), false);
  assert.equal(hasPermission('superadmin', 'superadmin'), true);
  assert.equal(hasPermission('clinic_admin', 'settings'), true);
});
