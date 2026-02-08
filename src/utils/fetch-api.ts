type NextFetchRequestConfig = {
	revalidate?: number | false
	tags?: string[]
}

interface FetchAPIOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authToken?: string;
  body?: Record<string, unknown> | FormData;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  headers?: Record<string, string>;
}

export async function fetchAPI(
  url: string,
  options: FetchAPIOptions
): Promise<T> {
  const { method, authToken, body, next, cache = 'default', headers = {} } = options;

  // Создаем базовые заголовки
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...headers,
  };

  // Если body является FormData, удаляем Content-Type для корректной загрузки файлов
  if (body instanceof FormData) {
    delete defaultHeaders['Content-Type'];
  }

  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: defaultHeaders,
    cache,
    ...(next && { next }),
  };

  // Добавляем body только если это не GET запрос
  if (method !== 'GET' && body) {
    fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    // Обрабатываем случаи, когда ответ не JSON (например, файлы)
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.blob();

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}\n${JSON.stringify(
          data?.message || data
        )}`
      );
    }

    return data;
  } catch (error) {
    console.error(`[fetchAPI] ${method} request to ${url} failed:`, error);

    // Улучшенная обработка ошибок
    const errorMessage = error instanceof Error ? error.message : 'Unknown fetch error';
    throw new Error(`API request failed: ${errorMessage}`);
  }
}
