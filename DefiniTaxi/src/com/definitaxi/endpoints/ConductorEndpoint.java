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
import com.definitaxi.entities.Documento;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.api.users.User;
import com.google.appengine.datanucleus.query.JPACursorHelper;

@Api(
		name = "conductorendpoint",
		version = "v1",
		scopes = {"https://www.googleapis.com/auth/userinfo.email"},
		clientIds = {"1038956616402-vb9iu5569j0i4l3b6ovvs56cfrolh5jm.apps.googleusercontent.com"}
)
public class ConductorEndpoint {
	
	

	private static Logger logger = Logger.getLogger(ConductorEndpoint.class
			.getName());

	/**
	 * This method lists all the entities inserted in datastore. It uses HTTP
	 * GET method and paging support.
	 *
	 * @return A CollectionResponse class containing the list of all entities
	 *         persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listConductoresVehiculo")
	public CollectionResponse<Conductor> listConductor(
			@Named("idPropietario") String idPropietario,
			@Named("placa") String placa,
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {
		
		logger.info("listConductoresVehiculo - idPropietario: "+idPropietario+" - Placa: "+placa);
		
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Conductor> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Conductor as c where c.idPropietario='"+idPropietario+"' and c.placa='"+placa+"'");
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				query.setHint(JPACursorHelper.CURSOR_HINT, cursor);
			}

			if (limit != null) {
				query.setFirstResult(0);
				query.setMaxResults(limit);
			}

			execute = (List<Conductor>) query.getResultList();
			cursor = JPACursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Conductor obj : execute){
				obj.getDocumentos();
			}
		} catch(Exception e){
			e.printStackTrace();
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Conductor> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}
	
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listVehiculosConductor", path="listvehiculosconductor")
	public CollectionResponse<Conductor> listVehiculosConductor(
			@Named("email") String email,
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {
		
		logger.info("listConductoresVehiculo - email: "+email);
		
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Conductor> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Conductor as c where c.email='"+email+"'");
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				query.setHint(JPACursorHelper.CURSOR_HINT, cursor);
			}

			if (limit != null) {
				query.setFirstResult(0);
				query.setMaxResults(limit);
			}

			execute = (List<Conductor>) query.getResultList();
			cursor = JPACursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Conductor obj : execute){
				obj.getDocumentos();
			}
		} catch(Exception e){
			e.printStackTrace();
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Conductor> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}
	
	
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listTodosConductores", path="listtodosconductores")
	public CollectionResponse<Conductor> listTodosConductores(
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {
		
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Conductor> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Conductor as c");
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				query.setHint(JPACursorHelper.CURSOR_HINT, cursor);
			}

			if (limit != null) {
				query.setFirstResult(0);
				query.setMaxResults(limit);
			}

			execute = (List<Conductor>) query.getResultList();
			cursor = JPACursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Conductor obj : execute){
				obj.getDocumentos();
			}
		} catch(Exception e){
			e.printStackTrace();
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Conductor> builder().setItems(execute)
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
	@ApiMethod(name = "getConductor")
	public Conductor getConductor(@Named("id") Long id) {
		EntityManager mgr = getEntityManager();
		Conductor Conductor = null;
		try {
			Conductor = mgr.find(Conductor.class, id);
		} finally {
			mgr.close();
		}
		return Conductor;
	}

	/**
	 * This inserts a new entity into App Engine datastore. If the entity
	 * already exists in the datastore, an exception is thrown. It uses HTTP
	 * POST method.
	 *
	 * @param conductor
	 *            the entity to be inserted.
	 * @return The inserted entity.
	 */
	@ApiMethod(name = "insertConductor")
	public Conductor insertConductor(Conductor conductor, User user) throws OAuthRequestException {
		logger.info("insertConductor");
		if(user!=null){
			logger.info("userAuthenticated");
			EntityManager mgr = getEntityManager();
			mgr.getTransaction().begin();
			conductor = mgr.merge(conductor);
			mgr.flush();
			mgr.getTransaction().commit();
			mgr.close();
			return conductor;
		}
		return null;
	}

	/**
	 * This method is used for updating an existing entity. If the entity does
	 * not exist in the datastore, an exception is thrown. It uses HTTP PUT
	 * method.
	 *
	 * @param conductor
	 *            the entity to be updated.
	 * @return The updated entity.
	 */
	@ApiMethod(name = "updateDocumentosConductor", path="updatedocumentosconductor")
	public Conductor updateConductor(Conductor conductor, User user) throws OAuthRequestException {
		try{
		logger.info("updateConductor");
		if(user!=null){
			logger.info("userAuthenticated");
			EntityManager mgr = getEntityManager();
			mgr.getTransaction().begin();
			String nombre = conductor.getNombre();
			String estado = conductor.getEstado();
			String imageUrl = conductor.getImageUrl();
			List<Documento> documentos = conductor.getDocumentos();
			conductor = (Conductor) mgr.createQuery("Select from Conductor c where c.id="+conductor.getId()).getSingleResult();
			conductor.setNombre(nombre);
			conductor.setEstado(estado);
			conductor.setImageUrl(imageUrl);
			conductor.setDocumentos(documentos);
			conductor = mgr.merge(conductor);
			mgr.flush();
			mgr.getTransaction().commit();
			mgr.close();
			return conductor;
		
		}
		}catch(Exception e){
			logger.warning("Error: "+e.getMessage());
			e.printStackTrace();
		}
		return null;
	}
	
	@ApiMethod(name = "updateEstadoConductor", path="updateestadoconductor")
	public Conductor updateEstadoConductor(Conductor conductor, User user) throws OAuthRequestException {
		logger.info("updateEstadoConductor");
		if(user!=null){
			logger.info("userAuthenticated");
			EntityManager mgr = getEntityManager();
			mgr.getTransaction().begin();
			String estado = conductor.getEstado();
			conductor = (Conductor) mgr.createQuery("Select from Conductor c where c.id="+conductor.getId()).getSingleResult();
			conductor.setEstado(estado);
			conductor.getDocumentos();
			conductor = mgr.merge(conductor);
			mgr.flush();
			mgr.getTransaction().commit();
			mgr.close();
			return conductor;
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
	@ApiMethod(name = "toggleConductor")
	public void removeConductor(@Named("id") String id) {
		EntityManager mgr = getEntityManager();
		try {
			mgr.getTransaction().begin();
			Conductor Conductor = mgr.find(Conductor.class, id);
			if(Conductor==null){
				throw new EntityNotFoundException("No existe un Conductor con numero de identificacion: "+id);
			}
			mgr.persist(Conductor);
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
