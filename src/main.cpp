
#include <emscripten.h>
#include <emscripten/bind.h>
#include <iostream>

using namespace emscripten;

void myPrint() {
    std::cout << "XXXXXXXXX\n";
}

EMSCRIPTEN_BINDINGS(my_module) { 
  function("myPrint", &myPrint);
}