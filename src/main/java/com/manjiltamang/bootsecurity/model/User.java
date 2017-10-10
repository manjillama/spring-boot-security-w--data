package com.manjiltamang.bootsecurity.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String username;
	private String password;
	private boolean enabled;
	@OneToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER, mappedBy="user")
	private Set<Authorities> roles;
	
	public User(){}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Set<Authorities> getRoles() {
		return roles;
	}

	public void setRoles(Set<Authorities> roles) {
		this.roles = roles;
	}		
}