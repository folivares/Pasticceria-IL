package it.test.pasticceriail.exception;

/**
 * 
 * Exception relativa a check associazione ingredienti - dolci
 * prima di rimozione ingrediente
 * 
 */
public class IngredienteHasDolciEx extends Exception {
    
	public static int errorCode = ExceptionErrorEnum.INGREDIENTE_HAS_DOLCI.getCode();

	public static String message = ExceptionErrorEnum.INGREDIENTE_HAS_DOLCI.getMessage();
	
	public IngredienteHasDolciEx() {
		super(message);
	}

	public int getCode() {
		return errorCode;
	}

}