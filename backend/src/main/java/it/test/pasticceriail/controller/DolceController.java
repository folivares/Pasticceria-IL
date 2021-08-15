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

import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.dto.JSONResponseDTO;
import it.test.pasticceriail.exception.ExceptionErrorEnum;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.service.impl.DolceService;

@RestController
@RequestMapping(path = "api")
public class DolceController {

    @Autowired
    DolceService dolceService;

    /**
     * HTTP GET per recupero lista dolci
     * 
     * @return lista dolci
     */
    @GetMapping(value = "dolci")
    public ResponseEntity<Object> getAllDolci() {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(), dolceService.getAllDolci()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
        }
    }

    /**
     * HTTP GET per recupero dolce specifico
     * 
     * @param id dolce
     * @return dolce richiesto
     */
    @GetMapping("/dolci/{id}")
    public ResponseEntity<Object> getDolceById(@PathVariable("id") long id) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(), dolceService.getDolceById(id)));
        } catch (IdNotFoundEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
        }
    }

    /**
     * HTTP POST per crezione nuovo oggetto dolce
     * 
     * @param dolceRequest
     * @return dolce appena creato con nuovo id assegnato
     */
    @PostMapping("/dolci")
    public ResponseEntity<Object> createDolce(@RequestBody Dolce dolceRequest) {
        try {
            return ResponseEntity
                    .ok(new JSONResponseDTO(HttpStatus.OK.value(), dolceService.createDolce(dolceRequest)));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * HTTP PUT per aggiornare oggetto dolce
     * 
     * @param id dolce
     * @param dolceRequest
     * @return dolce aggiornato
     */
    @PutMapping("/dolci/{id}")
    public ResponseEntity<Object> updateDolce(@PathVariable("id") long id, @RequestBody Dolce dolceRequest) {
        try {
            return ResponseEntity
                    .ok(new JSONResponseDTO(HttpStatus.OK.value(), dolceService.updateDolce(id, dolceRequest)));
        } catch (IdNotFoundEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * HTTP DELETE per rimozione dolce specifico
     * 
     * @param id dolce
     * @return
     */
    @DeleteMapping("/dolci/{id}")
    public ResponseEntity<Object> deleteDolce(@PathVariable("id") long id) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(), dolceService.deleteDolce(id)));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
