package com.definitaxi.endpoints;

import java.util.List;
import java.util.logging.Logger;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.Query;


import com.definitaxi.EMF;
import com.definitaxi.entities.Propietario;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.api.users.User;
import com.google.appengine.datanucleus.query.JPACursorHelper;

@Api(
		name = "propietarioendpoint",
		version = "v1",
		scopes = {"https://www.googleapis.com/auth/userinfo.email"},
		clientIds = {"1038956616402-vb9iu5569j0i4l3b6ovvs56cfrolh5jm.apps.googleusercontent.com"}
)
public class PropietarioEndpoint {
	
	

	private static Logger logger = Logger.getLogger(PropietarioEndpoint.class
			.getName());

	/**
	 * This method lists all the entities inserted in datastore. It uses HTTP
	 * GET method and paging support.
	 *
	 * @return A CollectionResponse class containing the list of all entities
	 *         persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listPropietario")
	public CollectionResponse<Propietario> listPropietario(
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Propietario> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Propietario as Propietario order by Propietario.numeroContrato asc");
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				query.setHint(JPACursorHelper.CURSOR_HINT, cursor);
			}

			if (limit != null) {
				query.setFirstResult(0);
				query.setMaxResults(limit);
			}

			execute = (List<Propietario>) query.getResultList();
			cursor = JPACursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Propietario obj : execute)
				;
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Propietario> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}

	/**
	 * This method gets the entity having primary key id. It uses HTTP GET
	 * method.
	 *
	 * @param id
	 *            the primary key of the java bean.
	 * @return The entity with primary key id.
	 */
	@ApiMethod(name = "getPropietario")
	public Propietario getPropietario(@Named("id") Long id) {
		EntityManager mgr = getEntityManager();
		Propietario Propietario = null;
		try {
			Propietario = mgr.find(Propietario.class, id);
		} finally {
			mgr.close();
		}
		return Propietario;
	}

	/**
	 * This inserts a new entity into App Engine datastore. If the entity
	 * already exists in the datastore, an exception is thrown. It uses HTTP
	 * POST method.
	 *
	 * @param propietario
	 *            the entity to be inserted.
	 * @return The inserted entity.
	 */
	@ApiMethod(name = "insertPropietario")
	public Propietario insertPropietario(Propietario propietario, User user) throws OAuthRequestException {
		logger.info("insertPropietario");
		if(user!=null){
			logger.info("userAuthenticated");
			EntityManager mgr = getEntityManager();
			mgr.getTransaction().begin();
			propietario = mgr.merge(propietario);
			mgr.flush();
			mgr.getTransaction().commit();
			mgr.close();
			return propietario;
		}
		return null;
	}

	/**
	 * This method is used for updating an existing entity. If the entity does
	 * not exist in the datastore, an exception is thrown. It uses HTTP PUT
	 * method.
	 *
	 * @param propietario
	 *            the entity to be updated.
	 * @return The updated entity.
	 */
	@ApiMethod(name = "updatePropietario")
	public Propietario updatePropietario(Propietario propietario) {
		
		return propietario;
	}

	/**
	 * This method removes the entity with primary key id. It uses HTTP DELETE
	 * method.
	 *
	 * @param id
	 *            the primary key of the entity to be deleted.
	 */
	@ApiMethod(name = "togglePropietario")
	public void removePropietario(@Named("id") String id) {
		EntityManager mgr = getEntityManager();
		try {
			mgr.getTransaction().begin();
			Propietario Propietario = mgr.find(Propietario.class, id);
			if(Propietario==null){
				throw new EntityNotFoundException("No existe un Propietario con numero de identificacion: "+id);
			}
			mgr.persist(Propietario);
			mgr.flush();
			mgr.getTransaction().commit();
		} finally {
			if(mgr.getTransaction().isActive()){
				mgr.getTransaction().rollback();
			}
			mgr.close();
		}
	}

	private static EntityManager getEntityManager() {
		return EMF.get().createEntityManager();
	}
	
}
