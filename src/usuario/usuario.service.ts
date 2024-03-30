import { Client } from 'pg';
import { Usuario } from './usuario.interface';

export async function create(usuario: Usuario) {
  const client = new Client();

  await client.connect();

  const res = await client.query(
    'INSERT INTO usuario (nome, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *',
    [usuario.nome, usuario.email, usuario.password, usuario.admin]
  );

  await client.end();

  return res.rows[0];
}

export async function update(id: number, usuario: Usuario) {
  const client = new Client();

  await client.connect();

  const res = await client.query(
    'UPDATE usuario SET nome = $2, email = $3, password = $4, admin = $5 WHERE id = $1 RETURNING *',
    [id, usuario.nome, usuario.email, usuario.password, usuario.admin]
  );

  await client.end();

  return res.rows[0];
}

export async function remove(id: number) {
  const client = new Client();

  await client.connect();

  await client.query('DELETE FROM usuario WHERE id = $1', [id]);

  await client.end();
}

export async function findAll() {
  const client = new Client();

  await client.connect();

  const res = await client.query('SELECT * FROM usuario');

  await client.end();

  return res.rows;
}

export async function findById(id: number) {
  const client = new Client();

  await client.connect();

  const res = await client.query('SELECT * FROM usuario WHERE id = $1', [id]);

  await client.end();

  return res.rows[0];
}

export async function revokeAdmin(id: number) {
  const client = new Client();

  await client.connect();

  const res = await client.query(
    'UPDATE usuario SET admin = false WHERE id = $1 RETURNING *',
    [id]
  );

  await client.end();

  return res.rows[0];
}

export async function setAdmin(id: number) {
  const client = new Client();

  await client.connect();

  const res = await client.query(
    'UPDATE usuario SET admin = true WHERE id = $1 RETURNING *',
    [id]
  );

  await client.end();

  return res.rows[0];
}
