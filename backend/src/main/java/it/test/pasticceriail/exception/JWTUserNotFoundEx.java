package it.test.pasticceriail.exception;

/**
 * 
 * Exception relativa a utente non trovato dopo login
 * 
 */
public class JWTUserNotFoundEx extends Exception {
    
	public static int errorCode = ExceptionErrorEnum.JWT_USER_NOT_FOUND.getCode();

	public static String message = ExceptionErrorEnum.JWT_USER_NOT_FOUND.getMessage();
	
	public JWTUserNotFoundEx() {
		super(message);
	}

	public int getCode() {
		return JWTUserNotFoundEx.errorCode;
	}

}