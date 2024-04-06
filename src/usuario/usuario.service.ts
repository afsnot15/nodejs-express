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

export async function update(usuario: Usuario) {
  if(!usuario.id){
    return 'Usuário não encontrado, informe o id de usuário que deseja alterar';
  }

  const client = new Client();

  await client.connect();

  const res = await client.query(
    'UPDATE usuario SET nome = $2, email = $3, password = $4, admin = $5 WHERE id = $1 RETURNING *',
    [usuario.id, usuario.nome, usuario.email, usuario.password, usuario.admin]
  );

  await client.end();

  return res.rows[0];
}

export async function remove(id: number) {
  const client = new Client();

  await client.connect();

  const res = await client.query('DELETE FROM usuario WHERE id = $1', [id]);

  await client.end();

  return res.rowCount > 0 ? 'Usuário removido com sucesso' : 'Usuário não encontrado';
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

export async function setAdmin(idUsuario: number, admin: boolean) {
  if(!idUsuario){
    return 'Usuário não encontrado, informe o id de usuário que deseja alterar';
  }

  const client = new Client();

  await client.connect();

  const res = await client.query(
    'UPDATE usuario SET admin = $1 WHERE id = $2 RETURNING admin',
    [admin, idUsuario]
  );

  await client.end();

  return res.rows;
}
