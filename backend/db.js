const Database = require('better-sqlite3');
const db = new Database('./chromium_downloads.db');

db.exec(`
CREATE TABLE IF NOT EXISTS builds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version TEXT NOT NULL,
  os TEXT NOT NULL,
  channel TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  baseRevision TEXT,
  artifactsRevision TEXT,
  downloads TEXT,
  UNIQUE(version, os, channel, timestamp)
);
`);

function insertBuild(build) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO builds
    (version, os, channel, timestamp, baseRevision, artifactsRevision, downloads)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    build.version,
    build.os,
    build.channel,
    build.timestamp,
    build.baseRevision.toString(),
    build.artifactsRevision.toString(),
    JSON.stringify(build.downloads || {})
  );
}

function getBuildsSummary() {
  const stmt = db.prepare(`
    SELECT version, os, channel, timestamp
    FROM builds
    ORDER BY datetime(timestamp) DESC
  `);
  return stmt.all();
}

function getBuild(version, channel, os) {
  const stmt = db.prepare(`
    SELECT *
    FROM builds
    WHERE version = ? AND channel = ? AND os = ?
    LIMIT 1
  `);
  const row = stmt.get(version, channel, os);
  if (row) {
    row.downloads = JSON.parse(row.downloads || '{}');
  }
  return row;
}

function initialize() {
  console.log('Database initialized.');
  return Promise.resolve();
}

module.exports = {
  initialize,
  insertBuild,
  getBuildsSummary,
  getBuild,
};
