import { Client } from 'pg';
import { Usuario } from './usuario.interface';

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

export async function create(usuario: Usuario) {
  const client = new Client();

  console.log('pNome, pEmail, pPassword, pAdmin');

  await client.connect();

  const insertQuery =
    'INSERT INTO usuario (nome, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *';

  const res = await client.query(insertQuery, [
    usuario.nome,
    usuario.email,
    usuario.password,
    usuario.admin,
  ]);

  await client.end();

  return res.rows[0];
}
