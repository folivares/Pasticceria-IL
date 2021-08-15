package it.test.pasticceriail.exception;

/**
 * 
 * Exception relativa a jwt token mancante per una richiesta sotto auth
 * 
 */
public class JWTTokenMissedEx extends Exception {
    
	public static int errorCode = ExceptionErrorEnum.JWT_TOKEN_MISSED.getCode();

	public static String message = ExceptionErrorEnum.JWT_TOKEN_MISSED.getMessage();
	
	public JWTTokenMissedEx() {
		super(message);
	}

	public int getCode() {
		return JWTTokenMissedEx.errorCode;
	}

}