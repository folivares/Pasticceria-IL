USE test_il;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id`, `username`, `nome`, `cognome`, `ruolo`, `password`) VALUES
(1, 'luana@pasticceriail.it', 'Luana', 'Parigi', 'ROLE_ADMIN', '$2a$10$MmA1EzN3xzSY8QEMmaK5k.zaevvVdXAvHl3n.VMDRqhgeJBFGJxSa'),
(2, 'maria@pasticceriail.it', 'Maria', 'Londra', 'ROLE_ADMIN', '$2a$10$9mdokbVVs8k6vXlcNFfYWuIOfl8PqBbciC/PEDZnKhNt5x7mEBaJO');
COMMIT;

/*
	luana@pasticceriail.it -> password: 12345678
	maria@pasticceriail.it -> password: 87654321
*/