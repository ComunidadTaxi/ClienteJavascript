package com.definitaxi;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.definitaxi.endpoints.ConductorEndpoint;

/**
 * Servlet implementation class PayUResponse
 */
public class PayUResponse extends HttpServlet {
	
	
	private static final long serialVersionUID = 1L;
	private static Logger logger = Logger.getLogger(PayUResponse.class.getName());
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PayUResponse() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.info("Request:"+request);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.info("Request:"+request);
	}

}
