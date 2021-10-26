import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Token {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  token: string;

  @Column()
  userid: string;
}