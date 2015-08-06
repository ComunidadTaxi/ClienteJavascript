package co.com.taxislibres.redamarilla.central;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public final class EMF {
	private static final EntityManagerFactory emfInstance = Persistence.createEntityManagerFactory("central");

	private EMF() {
	}

	public static EntityManagerFactory get() {
		return emfInstance;
	}
}