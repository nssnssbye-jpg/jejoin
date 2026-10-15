import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const requiredPaths = [
  'plan.md',
  '.kiro/specs/ai-b2b-portal/requirements.md',
  '.kiro/specs/ai-b2b-portal/design.md',
  '.kiro/specs/ai-b2b-portal/tasks.md',
  'apps/web/package.json',
  'apps/api/package.json',
  'apps/workers/package.json',
  'infra/bootstrap/main.tf',
  'infra/modules/foundation/main.tf',
  'infra/environments/dev/main.tf',
  'infra/environments/staging/main.tf',
  'infra/environments/prod/main.tf',
];

test('repository contains the approved spec-driven monorepo structure', () => {
  for (const path of requiredPaths) {
    assert.equal(existsSync(path), true, `missing required path: ${path}`);
  }
});

test('Terraform environments use a shared foundation module', () => {
  for (const environment of ['dev', 'staging', 'prod']) {
    const path = `infra/environments/${environment}/main.tf`;
    assert.equal(existsSync(path), true, `missing environment: ${environment}`);
    const terraform = readFileSync(path, 'utf8');
    assert.match(terraform, /source\s*=\s*"\.\.\/\.\.\/modules\/foundation"/);
    assert.match(terraform, new RegExp(`environment\\s*=\\s*"${environment}"`));
  }
});

test('foundation enforces encryption, public access blocking, and standard tags', () => {
  const terraform = readFileSync('infra/modules/foundation/main.tf', 'utf8');
  assert.match(terraform, /aws_kms_key/);
  assert.match(terraform, /aws_s3_bucket_server_side_encryption_configuration/);
  assert.match(terraform, /aws_s3_bucket_public_access_block/);
  assert.match(terraform, /ManagedBy\s*=\s*"Terraform"/);
  assert.match(terraform, /Project\s*=\s*var\.project_name/);
});

test('Terraform providers are pinned to bounded compatible versions', () => {
  const versions = readFileSync('infra/modules/foundation/versions.tf', 'utf8');
  assert.match(versions, /required_version\s*=\s*">= 1\.8\.0, < 2\.0\.0"/);
  assert.match(versions, /version\s*=\s*"~> 5\.0"/);
});
