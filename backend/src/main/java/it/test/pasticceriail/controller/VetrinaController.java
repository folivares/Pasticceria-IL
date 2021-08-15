package it.test.pasticceriail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.test.pasticceriail.dto.FormDolceVetrinaDTO;
import it.test.pasticceriail.dto.JSONResponseDTO;
import it.test.pasticceriail.exception.ExceptionErrorEnum;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.repository.DolceRepository;
import it.test.pasticceriail.repository.DolceVetrinaRepository;
import it.test.pasticceriail.service.impl.VetrinaService;

@RestController
@RequestMapping(path = "api")
public class VetrinaController {

    @Autowired
    VetrinaService vetrinaService;

    @Autowired
    DolceRepository dolceRepository;
    @Autowired
    DolceVetrinaRepository dolceVetrinaRepository;

    /**
     * HTTP GET per recupero lista di tutti i dolci attualmente in vetrina
     * 
     * @return lista dolci
     */
    @GetMapping(value = "/vetrina")
    public ResponseEntity<Object> getAllDolciFromVetrina() {
        try {
            return ResponseEntity
                    .ok(new JSONResponseDTO(HttpStatus.OK.value(), vetrinaService.findDolciForVendita()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
        }
    }

    /**
     * HTTP POST PER aggiunta dolce specifico in vetrina
     * Se il dolce è già in vetrina lo sostituisce
     * 
     * @param id dolce
     * @param dolceVetrinaRequest quantità e prezzo base
     * @return dolce aggiornato
     */
    @PostMapping(value = "/vetrina/dolce/{id}")
    public ResponseEntity<Object> addDolceToVetrina(@PathVariable("id") long id,
            @RequestBody FormDolceVetrinaDTO dolceVetrinaRequest) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(),
                    vetrinaService.addDolceToVetrina(id, dolceVetrinaRequest)));
        } catch (IdNotFoundEx e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JSONResponseDTO(e.getCode(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
        }
    }

    /**
     * HTTP DELETE per rimozione di un dolce specifico dalla vetrina
     * 
     * @param id dolce
     * @return
     */
    @DeleteMapping("/vetrina/dolce/{id}")
    public ResponseEntity<Object> deleteDolceFromVetrina(@PathVariable("id") long id) {
        try {
            return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(), vetrinaService.deleteDolceFromVetrina(id)));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
