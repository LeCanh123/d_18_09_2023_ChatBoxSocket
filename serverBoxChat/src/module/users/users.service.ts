import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import path from 'path';



@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const generateUniqueId = () => {
      return Math.floor(Math.random() * 1000000);
    };

    const usersData = fs.readFileSync('user.json', 'utf8');
    const users = JSON.parse(usersData);
  
    const newUser = { id:generateUniqueId(),...createUserDto };
    users.users.push(newUser);
  
    const updatedUsersData = JSON.stringify(users);
    fs.writeFileSync('user.json', updatedUsersData, 'utf8');
  
    return newUser;
  }

  findAll() {
    // const filePath = path.join(__dirname, 'user.json');
    // console.log(__dirname);
    
    const usersData = fs.readFileSync("user.json", 'utf8');
    const users = JSON.parse(usersData);
    console.log("users",users);
    return users.users
  }

  findOne(id: number) {
    const usersData = fs.readFileSync('user.json', 'utf8');
    const users = JSON.parse(usersData);
  
    const user = users.users.find((user: any) => user.id === id);
  
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const usersData = fs.readFileSync('user.json', 'utf8');
    const users = JSON.parse(usersData);
  
    const user = users.users.find((user: any) => user.id === id);
  
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  
    Object.assign(user, updateUserDto);
  
    const updatedUsersData = JSON.stringify(users);
    fs.writeFileSync('user.json', updatedUsersData, 'utf8');
  
    return user;
  }

  remove(id: number) {
    const usersData = fs.readFileSync('user.json', 'utf8');
    const users = JSON.parse(usersData);
  console.log("users",users);
  
    const userIndex = users.users.findIndex((user: any) => user.id === id);
  
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  
    const removedUser = users.users.splice(userIndex, 1)[0];
  
    const updatedUsersData = JSON.stringify(users);
    fs.writeFileSync('user.json', updatedUsersData, 'utf8');
  
    return removedUser;
  }
}
function generateUniqueId() {
  throw new Error('Function not implemented.');
}

