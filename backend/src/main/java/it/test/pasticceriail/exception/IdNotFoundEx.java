package it.test.pasticceriail.exception;

/**
 * 
 * Exception relativa a id oggetto non presente
 * 
 */
public class IdNotFoundEx extends Exception {
    
	public static int errorCode = ExceptionErrorEnum.ID_NOT_FOUND.getCode();

	public static String message = ExceptionErrorEnum.ID_NOT_FOUND.getMessage();
	
	public IdNotFoundEx() {
		super(message);
	}

	public int getCode() {
		return errorCode;
	}

}