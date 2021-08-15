package it.test.pasticceriail.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import it.test.pasticceriail.dto.JSONResponseDTO;
import it.test.pasticceriail.exception.ExceptionErrorEnum;
import it.test.pasticceriail.exception.JWTTokenMissedEx;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtTokenUtil;

	/**
	 * 
	 * Filtra richieste HTTP.
	 * Verifica la presenza del token per le API request
	 * con auth e in caso di successo procede
	 * verso l'esecuzione effettiva della request
	 * 
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		try {
			// gestione API senza auth token
			String[] url_splitted = request.getRequestURL().toString().split("/");
			String url = url_splitted[url_splitted.length - 1];
			if (url.equals("login") || url.equals("vetrina")) {
				chain.doFilter(request, response);
			} else {
				// gestione  API con auth token
				String jwtToken = extractJwtFromRequest(request);
				if (StringUtils.hasText(jwtToken) && jwtTokenUtil.validateToken(jwtToken)) {
					UserDetails userDetails = new User(jwtTokenUtil.getUsernameFromToken(jwtToken), "",
							jwtTokenUtil.getRolesFromToken(jwtToken));
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					// utente corrente autenticato. Spring Secutiry Confs success
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				} else {
					throw new JWTTokenMissedEx();
				}
				// passa all'esecuzione della request
				chain.doFilter(request, response);
			}
		} catch (JWTTokenMissedEx e) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(e.getCode(), e.getMessage());
			response.setStatus(401);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		} catch (ExpiredJwtException ex) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(ExceptionErrorEnum.JWT_TOKEN_EXPIRED.getCode(),
					ExceptionErrorEnum.JWT_TOKEN_EXPIRED.getMessage());
			response.setStatus(401);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		} catch (BadCredentialsException ex) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(ExceptionErrorEnum.JWT_CREDENTIAL.getCode(),
					ExceptionErrorEnum.JWT_CREDENTIAL.getMessage());
			response.setStatus(401);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		} catch (SignatureException e) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(ExceptionErrorEnum.JWT_TOKEN_GENERIC_ERROR.getCode(),
					ExceptionErrorEnum.JWT_CREDENTIAL.getMessage());
			response.setStatus(401);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		} catch (IllegalArgumentException e) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(ExceptionErrorEnum.JWT_TOKEN_GENERIC_ERROR.getCode(),
					ExceptionErrorEnum.JWT_CREDENTIAL.getMessage());
			response.setStatus(401);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		} catch (MalformedJwtException e) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(ExceptionErrorEnum.JWT_TOKEN_GENERIC_ERROR.getCode(),
					ExceptionErrorEnum.JWT_CREDENTIAL.getMessage());
			response.setStatus(401);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		} catch (Exception e) {
			JSONResponseDTO jsonResponse = new JSONResponseDTO(500, "Errore generico");
			response.setStatus(500);
			response.getWriter().write(convertObjectToJson(jsonResponse));
		}
	}

	/**
	 * Estrae Token da header della request
	 * 
	 * @param request
	 * @return jwt token
	 */
	private String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

	/**
	 * Converto oggetto in json per la risposta
	 * 
	 * @param object
	 * @return
	 * @throws JsonProcessingException
	 */
	private String convertObjectToJson(Object object) throws JsonProcessingException {
		if (object == null) {
			return null;
		}
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(object);
	}

}