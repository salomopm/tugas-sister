from fastapi import FastAPI
import mysql.connector
from pydantic import BaseModel

# Initialize a variable to hold the database connection
conn = None

def db_con():
    conn = mysql.connector.connect(host='localhost', 
                                port=3306,
                                database='tugas_sister',
                                user='root',
                                password='')
    return conn


app = FastAPI()

class Mahasiswa(BaseModel):
    nim: str
    nama: str
    umur: int
    tinggi: int
    hobi: str

@app.get("/")
def first_example():
    return {"Salomo Polanco M0521068": "FastAPI"}

@app.post("/mahasiswa")
async def create_user(mahasiswa: Mahasiswa):
    conn = db_con()
    try:
        cursor = conn.cursor()
        query = 'INSERT INTO mahasiswa (nim, nama, umur, tinggi, hobi) VALUES (%s, %s, %s, %s, %s)'
        values = (mahasiswa.nim, mahasiswa.nama, mahasiswa.umur, mahasiswa.tinggi, mahasiswa.hobi)
        print(values)
        cursor.execute(query, values)
        conn.commit()
    finally:
        cursor.close()
        conn.close()
    return {"message": "User created successfully"}

@app.get("/mahasiswa")
async def read_mahasiswa():
    conn = db_con()
    try:
        cursor = conn.cursor()
        query = "SELECT * FROM mahasiswa"
        cursor.execute(query)
        mahasiswa = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
    return mahasiswa

@app.get("/mahasiswa/{mahasiswa_id}")
async def read_mahasiswa(mahasiswa_id: int):
    conn = db_con()
    try:
        cursor = conn.cursor()
        query = "SELECT * FROM mahasiswa WHERE id = '%s'"
        values = (mahasiswa_id)
        cursor.execute(query, (values, ))
        mahasiswa = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
    return mahasiswa


@app.put("/mahasiswa/{mahasiswa_id}")
async def update_mahasiswa(mahasiswa: Mahasiswa, mahasiswa_id: int):
    conn = db_con()
    try:
        cursor = conn.cursor()
        query = "UPDATE mahasiswa SET nim=%s, nama=%s, umur=%s, tinggi=%s, hobi=%s WHERE id=%s"
        values = (mahasiswa.nim, mahasiswa.nama, mahasiswa.umur, mahasiswa.tinggi, mahasiswa.hobi, mahasiswa_id)
        cursor.execute(query, values)
        conn.commit()
    finally:
        cursor.close()
        conn.close()
    return {"message": "Mahasiswa updated successfully"}

@app.delete("/mahasiswa/{mahasiswa_id}")
async def delete_mahasiswa(mahasiswa_id: int):
    conn = db_con()
    try:
        cursor = conn.cursor()
        query = "DELETE FROM mahasiswa WHERE id=%s"
        values = (mahasiswa_id)
        cursor.execute(query, (values, ))
        conn.commit()
    finally:
        cursor.close()
        conn.close()
    return {"message": "Mahasiswa deleted successfully"}