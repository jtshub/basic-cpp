output: main.o
    g++ -std=c++11 main.o

main.o: main.cpp
    g++ -std=c++11 main.cpp

clean:
    rm *.o 