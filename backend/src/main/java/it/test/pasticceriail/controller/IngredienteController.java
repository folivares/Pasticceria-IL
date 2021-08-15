package it.test.pasticceriail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.test.pasticceriail.domain.Ingrediente;
import it.test.pasticceriail.dto.JSONResponseDTO;
import it.test.pasticceriail.exception.ExceptionErrorEnum;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.exception.IngredienteHasDolciEx;
import it.test.pasticceriail.service.impl.IngredienteService;

@RestController
@RequestMapping(path = "api")
public class IngredienteController {

    @Autowired
    IngredienteService ingredienteService;

    /**
     * HTTP GEET per recupero lista di tutti gli ingredienti
     * 
     * @return lista ingredienti
     */
    @GetMapping(value = "ingredienti")
    public ResponseEntity<Object> getAllIngredienti() {
        try {
            return ResponseEntity
                    .ok(new JSONResponseDTO(HttpStatus.OK.value(), ingredienteService.getAllIngredienti()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
        }
    }

    /**
     * HTTP GET per recupero ingrediente specifico
     * 
     * @param id ingrediente
     * @return ingrediente richiesto
     */
    @GetMapping("/ingredienti/{id}")
    public ResponseEntity<Object> getIngredienteById(@PathVariable("id") long id) {
        try {
            return ResponseEntity
                    .ok(new JSONResponseDTO(HttpStatus.OK.value(), ingredienteService.getIngredienteById(id)));
        } catch (IdNotFoundEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
        }
    }

    /**
     * HTTP POST per creazione ingrediente
     * 
     * @param ingredienteRequest
     * @return ingrediente appena creato con nuovo id assegnato
     */
    @PostMapping("/ingredienti")
    public ResponseEntity<Object> createIngrediente(@RequestBody Ingrediente ingredienteRequest) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(),
                    ingredienteService.createIngrediente(ingredienteRequest)));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * HTTP PUT per aggiornamento ingrediente specifico
     * 
     * @param id ingrediente
     * @param ingredienteRequest
     * @return ingrediente aggiornato
     */
    @PutMapping("/ingredienti/{id}")
    public ResponseEntity<Object> updateIngrediente(@PathVariable("id") long id,
            @RequestBody Ingrediente ingredienteRequest) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(),
                    ingredienteService.updateIngrediente(id, ingredienteRequest)));
        } catch (IdNotFoundEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * HTTP DELETE per rimozione ingrediente specifico
     * 
     * @param id ingrediente
     * @return
     */
    @DeleteMapping("/ingredienti/{id}")
    public ResponseEntity<Object> deleteIngrediente(@PathVariable("id") long id) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(), ingredienteService.deleteIngrediente(id)));
        } catch (IdNotFoundEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));
        } catch (IngredienteHasDolciEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
