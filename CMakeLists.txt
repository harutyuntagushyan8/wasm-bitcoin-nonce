cmake_minimum_required(VERSION 3.12.0)

project(nonce)

file(GLOB SOURCE_FILES ${PROJECT_SOURCE_DIR}/src/*.cpp)
file(GLOB HEADER_FILES ${PROJECT_SOURCE_DIR}/src/*.h)
add_executable(nonce ${SOURCE_FILES} ${HEADER_FILES})

target_compile_options(nonce PUBLIC -pthread)

list(
    APPEND
    EMSCRIPTEN_LINK_OPTIONS
    -lembind
    # Always necessary, because otherwise closure compile may mangle module name If
    # with modularize module will be function, which will not be mangled.
    -sMODULARIZE=1
    #-sEXPORTED_RUNTIME_METHODS=['EGL']
    -sEXPORT_NAME=createNonceModule
    -sWASM=1
    # Enable threads and set pool size
    -sUSE_PTHREADS=1
    -sPTHREAD_POOL_SIZE=4
    # Grow WASM memory on demand.
    -sALLOW_MEMORY_GROWTH=1
    -sLLD_REPORT_UNDEFINED
    # No entry point(main function)
    --no-entry
    -sALLOW_BLOCKING_ON_MAIN_THREAD=1
    # Disable useless warning about pthreads + memory growth being slow in some cases for JS.
    -Wno-pthreads-mem-growth
)

target_link_options(nonce PUBLIC ${EMSCRIPTEN_LINK_OPTIONS})


add_custom_command(
    TARGET ${PROJECT_NAME}
    POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}.*
        ${CMAKE_SOURCE_DIR}/dist/
    COMMENT "Copying ${PROJECT_NAME} to ${CMAKE_SOURCE_DIR}/dist" DEPENDS SCRIPTS
)

