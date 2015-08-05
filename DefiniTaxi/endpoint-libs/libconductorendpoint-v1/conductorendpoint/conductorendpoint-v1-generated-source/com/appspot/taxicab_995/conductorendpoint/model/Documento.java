/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * This code was generated by https://code.google.com/p/google-apis-client-generator/
 * (build: 2015-08-03 17:34:38 UTC)
 * on 2015-08-04 at 21:44:31 UTC 
 * Modify at your own risk.
 */

package com.appspot.taxicab_995.conductorendpoint.model;

/**
 * Model definition for Documento.
 *
 * <p> This is the Java data model class that specifies how to parse/serialize into the JSON that is
 * transmitted over HTTP when working with the conductorendpoint. For a detailed explanation see:
 * <a href="http://code.google.com/p/google-http-java-client/wiki/JSON">http://code.google.com/p/google-http-java-client/wiki/JSON</a>
 * </p>
 *
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public final class Documento extends com.google.api.client.json.GenericJson {

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String id;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String idDocumento;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private Key key;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String originalFilename;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String webContentLink;

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getId() {
    return id;
  }

  /**
   * @param id id or {@code null} for none
   */
  public Documento setId(java.lang.String id) {
    this.id = id;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getIdDocumento() {
    return idDocumento;
  }

  /**
   * @param idDocumento idDocumento or {@code null} for none
   */
  public Documento setIdDocumento(java.lang.String idDocumento) {
    this.idDocumento = idDocumento;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public Key getKey() {
    return key;
  }

  /**
   * @param key key or {@code null} for none
   */
  public Documento setKey(Key key) {
    this.key = key;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getOriginalFilename() {
    return originalFilename;
  }

  /**
   * @param originalFilename originalFilename or {@code null} for none
   */
  public Documento setOriginalFilename(java.lang.String originalFilename) {
    this.originalFilename = originalFilename;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getWebContentLink() {
    return webContentLink;
  }

  /**
   * @param webContentLink webContentLink or {@code null} for none
   */
  public Documento setWebContentLink(java.lang.String webContentLink) {
    this.webContentLink = webContentLink;
    return this;
  }

  @Override
  public Documento set(String fieldName, Object value) {
    return (Documento) super.set(fieldName, value);
  }

  @Override
  public Documento clone() {
    return (Documento) super.clone();
  }

}
