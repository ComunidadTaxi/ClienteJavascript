package co.com.taxislibres.redamarilla.central;

import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.Query;

import co.com.taxislibres.redamarilla.entidades.Conductor;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.datanucleus.query.JPACursorHelper;

@Api(name = "conductorendpoint",
// namespace = @ApiNamespace(ownerDomain = "taxislibres.com.co", ownerName =
// "taxislibres.com.co", packagePath = "redamarilla.entidades"),
version = "1", clientIds = { "924014721739-gb74oilrab5ohkmq731er8hgdp0h9kua.apps.googleusercontent.com" })
public class ConductorEndpoint {

	/**
	 * This method lists all the entities inserted in datastore. It uses HTTP
	 * GET method and paging support.
	 *
	 * @return A CollectionResponse class containing the list of all entities
	 *         persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(path = "{storespace}/listConductor")
	public CollectionResponse<Conductor> listConductor(
			@Named("storespace") String storespace,
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {

		NamespaceManager.set(storespace);
		EntityManager mgr = null;
		Cursor cursor = null;
		List<Conductor> execute = null;

		try {
			mgr = getEntityManager();
			Query query = mgr.createQuery("select from Conductor as Conductor");
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
			for (Conductor obj : execute)
				;
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
	@ApiMethod(path = "{storespace}/getConductor")
	public Conductor getConductor(@Named("storespace") String storespace,
			@Named("id") Long id) {
		NamespaceManager.set(storespace);
		EntityManager mgr = getEntityManager();
		Conductor conductor = null;
		try {
			conductor = mgr.find(Conductor.class, id);
		} finally {
			mgr.close();
		}
		return conductor;
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
	@ApiMethod(path = "{storespace}/insertConductor")
	public Conductor insertConductor(@Named("storespace") String storespace,
			Conductor conductor) {
		NamespaceManager.set(storespace);
		EntityManager mgr = getEntityManager();
		try {
			if (containsConductor(conductor)) {
				throw new EntityExistsException("Object already exists");
			}
			mgr.persist(conductor);
		} finally {
			mgr.close();
		}
		return conductor;
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
	@ApiMethod(path = "{storespace}/updateConductor")
	public Conductor updateConductor(@Named("storespace") String storespace,
			Conductor conductor) {
		NamespaceManager.set(storespace);
		EntityManager mgr = getEntityManager();
		try {
			if (!containsConductor(conductor)) {
				throw new EntityNotFoundException("Object does not exist");
			}
			mgr.persist(conductor);
		} finally {
			mgr.close();
		}
		return conductor;
	}

	/**
	 * This method removes the entity with primary key id. It uses HTTP DELETE
	 * method.
	 *
	 * @param id
	 *            the primary key of the entity to be deleted.
	 */
	@ApiMethod(name = "removeConductor")
	public void removeConductor(@Named("id") Long id) {
		EntityManager mgr = getEntityManager();
		try {
			Conductor conductor = mgr.find(Conductor.class, id);
			mgr.remove(conductor);
		} finally {
			mgr.close();
		}
	}

	private boolean containsConductor(Conductor conductor) {
		EntityManager mgr = getEntityManager();
		boolean contains = true;
		try {
			Conductor item = mgr.find(Conductor.class, conductor.getId());
			if (item == null) {
				contains = false;
			}
		} finally {
			mgr.close();
		}
		return contains;
	}

	private static EntityManager getEntityManager() {
		return EMF.get().createEntityManager();
	}

}
