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
 * Model definition for CollectionResponseConductor.
 *
 * <p> This is the Java data model class that specifies how to parse/serialize into the JSON that is
 * transmitted over HTTP when working with the conductorendpoint. For a detailed explanation see:
 * <a href="http://code.google.com/p/google-http-java-client/wiki/JSON">http://code.google.com/p/google-http-java-client/wiki/JSON</a>
 * </p>
 *
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public final class CollectionResponseConductor extends com.google.api.client.json.GenericJson {

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.util.List<Conductor> items;

  static {
    // hack to force ProGuard to consider Conductor used, since otherwise it would be stripped out
    // see http://code.google.com/p/google-api-java-client/issues/detail?id=528
    com.google.api.client.util.Data.nullOf(Conductor.class);
  }

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String nextPageToken;

  /**
   * @return value or {@code null} for none
   */
  public java.util.List<Conductor> getItems() {
    return items;
  }

  /**
   * @param items items or {@code null} for none
   */
  public CollectionResponseConductor setItems(java.util.List<Conductor> items) {
    this.items = items;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getNextPageToken() {
    return nextPageToken;
  }

  /**
   * @param nextPageToken nextPageToken or {@code null} for none
   */
  public CollectionResponseConductor setNextPageToken(java.lang.String nextPageToken) {
    this.nextPageToken = nextPageToken;
    return this;
  }

  @Override
  public CollectionResponseConductor set(String fieldName, Object value) {
    return (CollectionResponseConductor) super.set(fieldName, value);
  }

  @Override
  public CollectionResponseConductor clone() {
    return (CollectionResponseConductor) super.clone();
  }

}