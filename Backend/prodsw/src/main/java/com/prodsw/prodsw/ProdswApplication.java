package com.prodsw.prodsw;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.prodsw.prodsw.models.Administrador;
import com.prodsw.prodsw.models.Role;
import com.prodsw.prodsw.models.User;
import com.prodsw.prodsw.repository.AdministradorRepository;
import com.prodsw.prodsw.repository.RoleRepository;
import com.prodsw.prodsw.repository.UserRepository;

@SpringBootApplication
public class ProdswApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProdswApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository,UserRepository userRepository,PasswordEncoder passwordEncoder, AdministradorRepository administradorRepository){
		return  args -> {
			try{
				if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
				Role adminRole = roleRepository.save(new Role("ADMIN"));
				roleRepository.save(new Role("USER"));
				Set<Role> roles = new HashSet<>();
				roles.add(adminRole);
				Administrador admin = new Administrador();
				admin.setAdminNombre("admintest");
				admin.setAdminNombre2("admintest2");
				admin.setAdminApellido1("admintestap");
				admin.setAdminNombre2("admintes3");
				Set<Administrador> adminset = new HashSet<>();
				adminset.add(admin);
				User useradm = new User("1","admin",passwordEncoder.encode("admin"),"admint",roles,null,adminset);
				userRepository.save(useradm);
				admin.setUser(useradm);
				administradorRepository.save(admin);
				
			}catch(Exception e){
				System.out.println("the error is here\n---------------------------------------------------------------------");
				System.out.println(e);
				return;
			}

		};
	}


}
