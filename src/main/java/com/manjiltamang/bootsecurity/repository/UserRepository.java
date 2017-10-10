package com.manjiltamang.bootsecurity.repository;

import org.springframework.data.repository.CrudRepository;

import com.manjiltamang.bootsecurity.model.User;

public interface UserRepository extends CrudRepository<User, String>{
}
