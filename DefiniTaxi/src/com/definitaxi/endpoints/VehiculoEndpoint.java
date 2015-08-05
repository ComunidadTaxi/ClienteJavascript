package com.definitaxi.endpoints;

import java.util.List;
import java.util.logging.Logger;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.Query;





import com.definitaxi.EMF;
import com.definitaxi.entities.Conductor;
import com.definitaxi.entities.Propietario;
import com.definitaxi.entities.Vehiculo;
import com.definitaxi.entities.Vehiculo;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.api.users.User;
import com.google.appengine.datanucleus.query.JPACursorHelper;

@Api(
		name = "vehiculoendpoint",
		version = "v1",
		scopes = {"https://www.googleapis.com/auth/userinfo.email"},
		clientIds = {"1038956616402-vb9iu5569j0i4l3b6ovvs56cfrolh5jm.apps.googleusercontent.com"}
)
public class VehiculoEndpoint {
	
	

	private static Logger logger = Logger.getLogger(VehiculoEndpoint.class
			.getName());

	/**
	 * This method lists all the entities inserted in datastore. It uses HTTP
	 * GET method and paging support.
	 *
	 * @return A CollectionResponse class containing the list of all entities
	 *         persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listMisVehiculos", path="listmisvehiculos")
	public CollectionResponse<Vehiculo> listMisVehiculos(
			@Named("idPropietario") String idPropietario,
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Vehiculo> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Vehiculo as v where v.idPropietario='"+idPropietario+"'");
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				query.setHint(JPACursorHelper.CURSOR_HINT, cursor);
			}

			if (limit != null) {
				query.setFirstResult(0);
				query.setMaxResults(limit);
			}

			execute = (List<Vehiculo>) query.getResultList();
			cursor = JPACursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Vehiculo obj : execute){
				obj.getDocumentos();
			}
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Vehiculo> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}
	
	
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listTodosVehiculos", path="listtodosvehiculos")
	public CollectionResponse<Vehiculo> listTodosVehiculos(
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Vehiculo> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Vehiculo as v");
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				query.setHint(JPACursorHelper.CURSOR_HINT, cursor);
			}

			if (limit != null) {
				query.setFirstResult(0);
				query.setMaxResults(limit);
			}

			execute = (List<Vehiculo>) query.getResultList();
			cursor = JPACursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Vehiculo obj : execute){
				obj.getDocumentos();
			}
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Vehiculo> builder().setItems(execute)
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
	@ApiMethod(name = "getVehiculo")
	public Vehiculo getVehiculo(@Named("id") Long id) {
		EntityManager mgr = getEntityManager();
		Vehiculo vehiculo= null;
		try {
			vehiculo = mgr.find(Vehiculo.class, id);
		} finally {
			mgr.close();
		}
		return vehiculo;
	}

	/**
	 * This inserts a new entity into App Engine datastore. If the entity
	 * already exists in the datastore, an exception is thrown. It uses HTTP
	 * POST method.
	 *
	 * @param vehiculo
	 *            the entity to be inserted.
	 * @return The inserted entity.
	 */
	@ApiMethod(name = "insertVehiculo")
	public Vehiculo insertVehiculo(Vehiculo vehiculo, User user) throws OAuthRequestException {
		logger.info("insertVehiculo");
		if(user!=null){
			logger.info("userAuthenticated");
			EntityManager mgr = getEntityManager();
			mgr.getTransaction().begin();
			vehiculo = mgr.merge(vehiculo);
			mgr.flush();
			mgr.getTransaction().commit();
			mgr.close();
			return vehiculo;
		}
		return null;
	}

	/**
	 * This method is used for updating an existing entity. If the entity does
	 * not exist in the datastore, an exception is thrown. It uses HTTP PUT
	 * method.
	 *
	 * @param vehiculo
	 *            the entity to be updated.
	 * @return The updated entity.
	 */
	@ApiMethod(name = "updateEstadoVehiculo", path="updateestadovehiculo")
	public Vehiculo updateEstadoVehiculo(Vehiculo vehiculo, User user) {
		try{
		logger.info("updateEstadoVehiculo");
		if(user!=null){
			logger.info("userAuthenticated");
			EntityManager mgr = getEntityManager();
			mgr.getTransaction().begin();
			String estado = vehiculo.getEstado();
			vehiculo = (Vehiculo) mgr.createQuery("Select from Vehiculo v where v.id="+vehiculo.getId()).getSingleResult();
			vehiculo.setEstado(estado);
			vehiculo.getDocumentos();
			vehiculo = mgr.merge(vehiculo);
			mgr.flush();
			mgr.getTransaction().commit();
			mgr.close();
			return vehiculo;
		}
		}catch(Exception e){
			logger.warning("Error: "+e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * This method removes the entity with primary key id. It uses HTTP DELETE
	 * method.
	 *
	 * @param id
	 *            the primary key of the entity to be deleted.
	 */
	@ApiMethod(name = "toggleVehiculo")
	public void removeVehiculo(@Named("id") String id) {
		EntityManager mgr = getEntityManager();
		try {
			mgr.getTransaction().begin();
			Vehiculo Vehiculo = mgr.find(Vehiculo.class, id);
			if(Vehiculo==null){
				throw new EntityNotFoundException("No existe un Vehiculo con numero de identificacion: "+id);
			}
			mgr.persist(Vehiculo);
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
