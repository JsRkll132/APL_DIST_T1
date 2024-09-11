package com.prodsw.prodsw.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.User;




@Repository
public interface UserRepository extends JpaRepository<User,String> {
    Optional<User>  findByIdUsuario(String idUsuario);
    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username,String password);

    @Query(value = "SELECT MAX(u.id_Usuario) FROM USERS u", nativeQuery = true)
    Optional<String> findMaxId();
} 